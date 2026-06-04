import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import QRCode from "qrcode";
import { X, Plus, LogOut, QrCode, ExternalLink, Pencil, Download, Trash2 } from "lucide-react";
import { s as supabase } from "./client-9_o7IXC9.js";
import { c as cn, b as buttonVariants, B as Button, C as Card, I as Input, L as Label } from "./card-BMnGiDfI.js";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { toast } from "sonner";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
function generateShortCode(length = 7) {
  const alphabet = "abcdefghijkmnpqrstuvwxyz23456789";
  let out = "";
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  for (let i = 0; i < length; i++) out += alphabet[arr[i] % alphabet.length];
  return out;
}
function buildRedirectUrl(shortCode) {
  if (typeof window === "undefined") return `/r/${shortCode}`;
  return `${window.location.origin}/r/${shortCode}`;
}
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString(void 0, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}
function Index() {
  const qc = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  useEffect(() => {
    setPage(1);
  }, [search]);
  const {
    data: codes,
    isLoading
  } = useQuery({
    queryKey: ["qr_codes"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("qr_codes").select("*").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data;
    },
    refetchInterval: 1e4
  });
  const createMut = useMutation({
    mutationFn: async (input) => {
      const {
        data,
        error
      } = await supabase.from("qr_codes").insert({
        url: input.url,
        label: input.label,
        description: input.description,
        short_code: generateShortCode()
      }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (row) => {
      qc.invalidateQueries({
        queryKey: ["qr_codes"]
      });
      setCreateOpen(false);
      setViewing(row);
      toast.success("QR code created");
    },
    onError: (e) => toast.error(e.message)
  });
  const updateMut = useMutation({
    mutationFn: async (input) => {
      const {
        error
      } = await supabase.from("qr_codes").update({
        url: input.url,
        label: input.label,
        description: input.description
      }).eq("id", input.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["qr_codes"]
      });
      setEditing(null);
      toast.success("Updated");
    },
    onError: (e) => toast.error(e.message)
  });
  const deleteMut = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("qr_codes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["qr_codes"]
      });
      setDeleting(null);
      toast.success("Deleted");
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-background py-10 px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxs("header", { className: "mb-8 flex flex-wrap items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold tracking-tight text-foreground", children: "🦄 Cabana's Cute Cue-Are Code Console" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-muted-foreground", children: "Create QR codes, track scans, and edit destinations anytime." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxs(Button, { onClick: () => setCreateOpen(true), children: [
            /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
            " New QR code"
          ] }),
          /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: async () => {
            await supabase.auth.signOut();
          }, children: [
            /* @__PURE__ */ jsx(LogOut, { className: "mr-2 h-4 w-4" }),
            " Sign out"
          ] })
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Loading…" }) : !codes || codes.length === 0 ? /* @__PURE__ */ jsxs(Card, { className: "flex flex-col items-center justify-center py-16 text-center", children: [
        /* @__PURE__ */ jsx(QrCode, { className: "h-10 w-10 text-muted-foreground" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-4 text-lg font-semibold", children: "No QR codes yet" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Create your first QR code to get started." }),
        /* @__PURE__ */ jsxs(Button, { className: "mt-4", onClick: () => setCreateOpen(true), children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          " New QR code"
        ] })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(Input, { type: "search", placeholder: "Search by label or description…", value: search, onChange: (e) => setSearch(e.target.value), className: "max-w-md" }) }),
        (() => {
          const q = search.trim().toLowerCase();
          const filtered = q ? codes.filter((c) => c.label.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) : codes;
          if (filtered.length === 0) {
            return /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
              'No QR codes match "',
              search,
              '".'
            ] });
          }
          const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
          const currentPage = Math.min(page, totalPages);
          const start = (currentPage - 1) * pageSize;
          const pageItems = filtered.slice(start, start + pageSize);
          return /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: pageItems.map((c) => /* @__PURE__ */ jsx(QrCard, { code: c, onView: () => setViewing(c), onEdit: () => setEditing(c), onDelete: () => setDeleting(c) }, c.id)) }),
            totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
              /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => setPage((p) => Math.max(1, p - 1)), disabled: currentPage === 1, children: "Previous" }),
              /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
                "Page ",
                currentPage,
                " of ",
                totalPages
              ] }),
              /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => setPage((p) => Math.min(totalPages, p + 1)), disabled: currentPage === totalPages, children: "Next" })
            ] })
          ] });
        })()
      ] })
    ] }),
    /* @__PURE__ */ jsx(CreateOrEditDialog, { open: createOpen, onOpenChange: setCreateOpen, title: "New QR code", submitLabel: "Create", onSubmit: (v) => createMut.mutate(v), pending: createMut.isPending }),
    /* @__PURE__ */ jsx(CreateOrEditDialog, { open: !!editing, onOpenChange: (o) => !o && setEditing(null), title: "Edit QR code", submitLabel: "Save", initial: editing ?? void 0, onSubmit: (v) => editing && updateMut.mutate({
      id: editing.id,
      url: v.url,
      label: v.label,
      description: v.description
    }), pending: updateMut.isPending }),
    /* @__PURE__ */ jsx(ViewDialog, { code: viewing, onOpenChange: (o) => !o && setViewing(null) }),
    /* @__PURE__ */ jsx(AlertDialog, { open: !!deleting, onOpenChange: (o) => !o && setDeleting(null), children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete this QR code?" }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { children: "Any printed or shared QR codes pointing to this entry will stop working." })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsx(AlertDialogAction, { onClick: () => deleting && deleteMut.mutate(deleting.id), className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Delete" })
      ] })
    ] }) })
  ] });
}
function QrCard({
  code,
  onView,
  onEdit,
  onDelete
}) {
  const [dataUrl, setDataUrl] = useState("");
  const redirectUrl = useMemo(() => buildRedirectUrl(code.short_code), [code.short_code]);
  useEffect(() => {
    QRCode.toDataURL(redirectUrl, {
      width: 256,
      margin: 1
    }).then(setDataUrl);
  }, [redirectUrl]);
  return /* @__PURE__ */ jsxs(Card, { className: "flex flex-col p-4", children: [
    /* @__PURE__ */ jsx("button", { onClick: onView, className: "group relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-md bg-white p-2 transition hover:opacity-90", "aria-label": "View QR code", children: dataUrl ? /* @__PURE__ */ jsx("img", { src: dataUrl, alt: `QR for ${code.label || code.url}`, className: "h-full w-full" }) : /* @__PURE__ */ jsx("div", { className: "h-full w-full animate-pulse bg-muted" }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-1 min-h-[3rem]", children: [
      /* @__PURE__ */ jsx("p", { className: "line-clamp-2 text-lg font-semibold text-foreground", children: code.label || /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "(no label)" }) }),
      code.description ? /* @__PURE__ */ jsx("p", { className: "mt-1 line-clamp-2 text-xs text-muted-foreground", children: code.description }) : null,
      /* @__PURE__ */ jsxs("a", { href: code.url, target: "_blank", rel: "noreferrer", className: "mt-1 line-clamp-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground", children: [
        code.url,
        " ",
        /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-3 gap-2 rounded-md bg-muted px-3 py-2 text-xs", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-semibold text-foreground", children: code.scan_count }),
        /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "scans" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground", children: [
        /* @__PURE__ */ jsx("div", { children: "Created" }),
        /* @__PURE__ */ jsx("div", { className: "text-foreground", children: formatDate(code.created_at) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-right text-muted-foreground", children: [
        /* @__PURE__ */ jsx("div", { children: "Last scanned" }),
        /* @__PURE__ */ jsx("div", { className: "text-foreground", children: code.last_scanned_at ? formatDate(code.last_scanned_at) : "—" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-2", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "flex-1", onClick: onEdit, children: [
        /* @__PURE__ */ jsx(Pencil, { className: "mr-1 h-3 w-3" }),
        " Edit"
      ] }),
      /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "flex-1", onClick: onView, children: [
        /* @__PURE__ */ jsx(Download, { className: "mr-1 h-3 w-3" }),
        " View"
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: onDelete, "aria-label": "Delete", children: /* @__PURE__ */ jsx(Trash2, { className: "h-3 w-3" }) })
    ] })
  ] });
}
function CreateOrEditDialog({
  open,
  onOpenChange,
  title,
  submitLabel,
  initial,
  onSubmit,
  pending
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    onSubmit({
      url: url.trim(),
      label: label.trim(),
      description: description.trim()
    });
  };
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: title }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Editing the destination updates where existing QR codes redirect — they keep working." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "url", children: "Destination URL" }),
        /* @__PURE__ */ jsx(Input, { id: "url", type: "url", required: true, value: url, onChange: (e) => setUrl(e.target.value), placeholder: "https://example.com" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "label", children: "Label / context" }),
        /* @__PURE__ */ jsx(Textarea, { id: "label", value: label, onChange: (e) => setLabel(e.target.value), placeholder: "What is this QR code for?", rows: 2 })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "description", children: "Description (optional)" }),
        /* @__PURE__ */ jsx(Textarea, { id: "description", value: description, onChange: (e) => setDescription(e.target.value), placeholder: "More details about where or how this QR code is used", rows: 3 })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", onClick: () => onOpenChange(false), children: "Cancel" }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: pending, children: pending ? "Saving…" : submitLabel })
      ] })
    ] })
  ] }) });
}
function ViewDialog({
  code,
  onOpenChange
}) {
  const [dataUrl, setDataUrl] = useState("");
  const redirectUrl = code ? buildRedirectUrl(code.short_code) : "";
  useEffect(() => {
    if (!code) return;
    QRCode.toDataURL(redirectUrl, {
      width: 512,
      margin: 2
    }).then(setDataUrl);
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
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.src = dataUrl;
    await new Promise((r) => img.onload = r);
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
  return /* @__PURE__ */ jsx(Dialog, { open: !!code, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: code?.label || "QR code" }),
      code?.description ? /* @__PURE__ */ jsx(DialogDescription, { children: code.description }) : null,
      /* @__PURE__ */ jsxs(DialogDescription, { className: "break-all", children: [
        "→ ",
        code?.url
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      dataUrl ? /* @__PURE__ */ jsx("img", { src: dataUrl, alt: "QR code", className: "h-64 w-64" }) : /* @__PURE__ */ jsx("div", { className: "h-64 w-64 animate-pulse rounded bg-muted" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground break-all text-center", children: redirectUrl })
    ] }),
    /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsxs(Button, { onClick: handleDownload, disabled: !dataUrl, children: [
      /* @__PURE__ */ jsx(Download, { className: "mr-2 h-4 w-4" }),
      " Download PNG"
    ] }) })
  ] }) });
}
function wrapText(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
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
export {
  Index as component
};
