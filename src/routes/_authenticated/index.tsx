import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import QRCode from "qrcode";
import { Plus, Pencil, Trash2, Download, ExternalLink, QrCode, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { buildRedirectUrl, formatDate, generateShortCode } from "@/lib/qr-utils";

type QrCode = Tables<"qr_codes">;

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "🦄 Cabana's Cute Cue-Are Code Console" },
      {
        name: "description",
        content: "Create, edit, and track scans for your QR codes in one dashboard.",
      },
    ],
  }),
});

function Index() {
  const qc = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<QrCode | null>(null);
  const [deleting, setDeleting] = useState<QrCode | null>(null);
  const [viewing, setViewing] = useState<QrCode | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    setPage(1);
  }, [search]);

  const { data: codes, isLoading } = useQuery({
    queryKey: ["qr_codes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("qr_codes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as QrCode[];
    },
    refetchInterval: 10000,
  });

  const createMut = useMutation({
    mutationFn: async (input: { url: string; label: string; description: string }) => {
      const { data, error } = await supabase
        .from("qr_codes")
        .insert({
          url: input.url,
          label: input.label,
          description: input.description,
          short_code: generateShortCode(),
        })
        .select()
        .single();
      if (error) throw error;
      return data as QrCode;
    },
    onSuccess: (row) => {
      qc.invalidateQueries({ queryKey: ["qr_codes"] });
      setCreateOpen(false);
      setViewing(row);
      toast.success("QR code created");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateMut = useMutation({
    mutationFn: async (input: { id: string; url: string; label: string; description: string }) => {
      const { error } = await supabase
        .from("qr_codes")
        .update({ url: input.url, label: input.label, description: input.description })
        .eq("id", input.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["qr_codes"] });
      setEditing(null);
      toast.success("Updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("qr_codes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["qr_codes"] });
      setDeleting(null);
      toast.success("Deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <main className="min-h-screen bg-background py-10 px-4">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">🦄 Cabana's Cute Cue-Are Code Console</h1>
            <p className="mt-1 text-muted-foreground">
              Create QR codes, track scans, and edit destinations anytime.
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> New QR code
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                await supabase.auth.signOut();
              }}
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </Button>
          </div>
        </header>

        {isLoading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : !codes || codes.length === 0 ? (
          <Card className="flex flex-col items-center justify-center py-16 text-center">
            <QrCode className="h-10 w-10 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-semibold">No QR codes yet</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Create your first QR code to get started.
            </p>
            <Button className="mt-4" onClick={() => setCreateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> New QR code
            </Button>
          </Card>
        ) : (
          <>
            <div className="mb-4">
              <Input
                type="search"
                placeholder="Search by label or description…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-md"
              />
            </div>
            {(() => {
              const q = search.trim().toLowerCase();
              const filtered = q
                ? codes.filter(
                    (c) =>
                      c.label.toLowerCase().includes(q) ||
                      c.description.toLowerCase().includes(q),
                  )
                : codes;
              if (filtered.length === 0) {
                return (
                  <p className="text-sm text-muted-foreground">
                    No QR codes match "{search}".
                  </p>
                );
              }
              return (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((c) => (
                    <QrCard
                      key={c.id}
                      code={c}
                      onView={() => setViewing(c)}
                      onEdit={() => setEditing(c)}
                      onDelete={() => setDeleting(c)}
                    />
                  ))}
                </div>
              );
            })()}
          </>
        )}
      </div>

      <CreateOrEditDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="New QR code"
        submitLabel="Create"
        onSubmit={(v) => createMut.mutate(v)}
        pending={createMut.isPending}
      />

      <CreateOrEditDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        title="Edit QR code"
        submitLabel="Save"
        initial={editing ?? undefined}
        onSubmit={(v) =>
          editing && updateMut.mutate({ id: editing.id, url: v.url, label: v.label, description: v.description })
        }
        pending={updateMut.isPending}
      />

      <ViewDialog code={viewing} onOpenChange={(o) => !o && setViewing(null)} />

      <AlertDialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this QR code?</AlertDialogTitle>
            <AlertDialogDescription>
              Any printed or shared QR codes pointing to this entry will stop working.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleting && deleteMut.mutate(deleting.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

function QrCard({
  code,
  onView,
  onEdit,
  onDelete,
}: {
  code: QrCode;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [dataUrl, setDataUrl] = useState("");
  const redirectUrl = useMemo(() => buildRedirectUrl(code.short_code), [code.short_code]);

  useEffect(() => {
    QRCode.toDataURL(redirectUrl, { width: 256, margin: 1 }).then(setDataUrl);
  }, [redirectUrl]);

  return (
    <Card className="flex flex-col p-4">
      <button
        onClick={onView}
        className="group relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-md bg-white p-2 transition hover:opacity-90"
        aria-label="View QR code"
      >
        {dataUrl ? (
          <img src={dataUrl} alt={`QR for ${code.label || code.url}`} className="h-full w-full" />
        ) : (
          <div className="h-full w-full animate-pulse bg-muted" />
        )}
      </button>

      <div className="mt-1 min-h-[3rem]">
        <p className="line-clamp-2 text-lg font-semibold text-foreground">
          {code.label || <span className="text-muted-foreground">(no label)</span>}
        </p>
        {code.description ? (
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{code.description}</p>
        ) : null}
        <a
          href={code.url}
          target="_blank"
          rel="noreferrer"
          className="mt-1 line-clamp-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          {code.url} <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 rounded-md bg-muted px-3 py-2 text-xs">
        <div>
          <div className="font-semibold text-foreground">{code.scan_count}</div>
          <div className="text-muted-foreground">scans</div>
        </div>
        <div className="text-muted-foreground">
          <div>Created</div>
          <div className="text-foreground">{formatDate(code.created_at)}</div>
        </div>
        <div className="text-right text-muted-foreground">
          <div>Last scanned</div>
          <div className="text-foreground">
            {code.last_scanned_at ? formatDate(code.last_scanned_at) : "—"}
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={onEdit}>
          <Pencil className="mr-1 h-3 w-3" /> Edit
        </Button>
        <Button variant="outline" size="sm" className="flex-1" onClick={onView}>
          <Download className="mr-1 h-3 w-3" /> View
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          aria-label="Delete"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
}

function CreateOrEditDialog({
  open,
  onOpenChange,
  title,
  submitLabel,
  initial,
  onSubmit,
  pending,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  submitLabel: string;
  initial?: QrCode;
  onSubmit: (v: { url: string; label: string; description: string }) => void;
  pending: boolean;
}) {
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open) {
      setUrl(initial?.url ?? "");
      setLabel(initial?.label ?? "");
      setDescription(initial?.description ?? "");
    }
  }, [open, initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onSubmit({ url: url.trim(), label: label.trim(), description: description.trim() });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Editing the destination updates where existing QR codes redirect — they keep working.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Destination URL</Label>
            <Input
              id="url"
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="label">Label / context</Label>
            <Textarea
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="What is this QR code for?"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="More details about where or how this QR code is used"
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ViewDialog({
  code,
  onOpenChange,
}: {
  code: QrCode | null;
  onOpenChange: (o: boolean) => void;
}) {
  const [dataUrl, setDataUrl] = useState("");
  const redirectUrl = code ? buildRedirectUrl(code.short_code) : "";

  useEffect(() => {
    if (!code) return;
    QRCode.toDataURL(redirectUrl, { width: 512, margin: 2 }).then(setDataUrl);
  }, [code, redirectUrl]);

  const handleDownload = async () => {
    if (!code || !dataUrl) return;
    const size = 512;
    const padding = 32;
    const caption = code.label.trim();
    const lineHeight = 44;
    const lines = caption ? wrapText(caption, 28) : [];
    const captionH = lines.length ? lines.length * lineHeight + padding : 0;

    const canvas = document.createElement("canvas");
    canvas.width = size + padding * 2;
    canvas.height = size + padding * 2 + captionH;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = dataUrl;
    await new Promise((r) => (img.onload = r));
    ctx.drawImage(img, padding, padding, size, size);

    if (lines.length) {
      ctx.fillStyle = "#000";
      ctx.font = "600 36px ui-sans-serif, system-ui, sans-serif";
      ctx.textAlign = "center";
      lines.forEach((line, i) => {
        ctx.fillText(line, canvas.width / 2, size + padding * 2 + (i + 1) * lineHeight - 4);
      });
    }

    const d = new Date(code.created_at);
    const yyyymmdd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
    const safeLabel = (caption || "qr").replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "") || "qr";
    const link = document.createElement("a");
    link.download = `${safeLabel}-QR-Code-${yyyymmdd}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <Dialog open={!!code} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{code?.label || "QR code"}</DialogTitle>
          {code?.description ? (
            <DialogDescription>{code.description}</DialogDescription>
          ) : null}
          <DialogDescription className="break-all">→ {code?.url}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          {dataUrl ? (
            <img src={dataUrl} alt="QR code" className="h-64 w-64" />
          ) : (
            <div className="h-64 w-64 animate-pulse rounded bg-muted" />
          )}
          <p className="text-xs text-muted-foreground break-all text-center">{redirectUrl}</p>
        </div>
        <DialogFooter>
          <Button onClick={handleDownload} disabled={!dataUrl}>
            <Download className="mr-2 h-4 w-4" /> Download PNG
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) lines.push(current);
  return lines;
}
