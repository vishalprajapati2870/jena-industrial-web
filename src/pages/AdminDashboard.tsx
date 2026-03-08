import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Search,
  Download,
  LogOut,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  TrendingUp,
  Users,
  IndianRupee,
  Eye,
  X,
  Mail,
  Receipt,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────
type Status = "PENDING" | "CONFIRMED" | "CANCELLED";

interface OrderItem {
  product: string;
  category: string;
  quantity: number;
  amount: number;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail?: string;
  companyAddress?: string;
  items?: OrderItem[]; // Optional for backwards compatibility with old placed orders
  product?: string;     // Old format
  category?: string;    // Old format
  quantity?: number;    // Old format
  amount?: number;      // Old format
  subtotal?: number;    // New format
  gstRate?: number;     // New format
  gstAmount?: number;   // New format
  totalAmount?: number; // New format
  date: string;
  status: Status;
}

// ─── Status Badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: Status }) => {
  const styles: Record<Status, string> = {
    CONFIRMED: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    PENDING:   "bg-amber-100 text-amber-700 border border-amber-200",
    CANCELLED: "bg-red-100 text-red-600 border border-red-200",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${styles[status]}`}>
      {status}
    </span>
  );
};

// ─── Stat Card ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  bg: string;
}
const StatCard = ({ label, value, icon, color, bg }: StatCardProps) => (
  <div className="bg-background border border-border rounded-xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
    <div className={`${bg} rounded-xl p-3`}>
      <div className={color}>{icon}</div>
    </div>
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">{label}</p>
      <p className="text-2xl font-bold text-foreground mt-0.5">{value}</p>
    </div>
  </div>
);

// ─── Main Dashboard ────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<"ALL" | Status>("ALL");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>(() =>
    JSON.parse(localStorage.getItem("nsf_orders") || "[]")
  );

  // Guard auth + auto-reload orders when tab is focused
  useEffect(() => {
    if (localStorage.getItem("admin_auth") !== "true") {
      navigate("/admin");
    }
    const reload = () =>
      setOrders(JSON.parse(localStorage.getItem("nsf_orders") || "[]"));
    window.addEventListener("focus", reload);
    return () => window.removeEventListener("focus", reload);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    navigate("/admin");
  };

  // Stats
  const total     = orders.length;
  const pending   = orders.filter((o) => o.status === "PENDING").length;
  const confirmed = orders.filter((o) => o.status === "CONFIRMED").length;
  const cancelled = orders.filter((o) => o.status === "CANCELLED").length;
  const revenue   = orders
    .filter((o) => o.status === "CONFIRMED")
    .reduce((sum, o) => sum + (o.totalAmount || o.amount || 0), 0);

  // Filter + Search
  const filtered = orders.filter((o) => {
    const matchFilter = activeFilter === "ALL" || o.status === activeFilter;
    const q = search.toLowerCase();
    const matchSearch =
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      (o.product && o.product.toLowerCase().includes(q)) ||
      (o.items && o.items.some(item => item.product.toLowerCase().includes(q)));
    return matchFilter && matchSearch;
  });

  const updateStatus = (id: string, status: Status) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === id ? { ...o, status } : o));
      localStorage.setItem("nsf_orders", JSON.stringify(updated));
      return updated;
    });
    setOpenMenu(null);
  };

  const filters: Array<"ALL" | Status> = ["ALL", "PENDING", "CONFIRMED", "CANCELLED"];

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Top Bar */}
      <header className="bg-background border-b border-border sticky top-0 z-40 shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-lg p-1.5">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-heading font-bold text-foreground text-lg">Admin Dashboard</span>
              <span className="hidden sm:inline text-muted-foreground text-sm ml-2">— Naval Soap Factory</span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border-border text-foreground hover:bg-muted hover:text-primary text-sm font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <StatCard label="Total Orders"    value={total}     icon={<Package className="w-5 h-5" />}       color="text-blue-600"    bg="bg-blue-50" />
          <StatCard label="Pending"         value={pending}   icon={<Clock className="w-5 h-5" />}         color="text-amber-600"   bg="bg-amber-50" />
          <StatCard label="Confirmed"       value={confirmed} icon={<CheckCircle2 className="w-5 h-5" />}  color="text-emerald-600" bg="bg-emerald-50" />
          <StatCard label="Cancelled"       value={cancelled} icon={<XCircle className="w-5 h-5" />}       color="text-red-500"     bg="bg-red-50" />
          <div className="col-span-2 lg:col-span-4 xl:col-span-1 bg-primary rounded-xl p-5 flex items-center gap-4 shadow-sm min-w-0">
            <div className="bg-white/20 rounded-xl p-3 shrink-0">
              <IndianRupee className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-white/70 uppercase tracking-wide font-medium">Revenue</p>
              <p className="text-2xl font-bold text-white mt-0.5" title={`₹${revenue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}>
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', notation: 'compact', maximumFractionDigits: 2 }).format(revenue)}
              </p>
            </div>
          </div>
        </div>

        {/* Orders Table Card */}
        <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
          {/* Table Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 border-b border-border">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by ID, customer or product..."
                className="w-full pl-9 pr-4 py-2 border border-border rounded-lg bg-muted/20 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>

            {/* Filters + Download */}
            <div className="flex items-center gap-2 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all border ${
                    activeFilter === f
                      ? "bg-primary text-white border-primary shadow"
                      : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {f}
                </button>
              ))}
              <button
                title="Export CSV"
                className="ml-2 p-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                onClick={() => {
                  const rows = [
                    ["Order ID","Customer","Email","Company Address","Items","Total Qty","Total Amount","Date","Status"],
                    ...filtered.map((o) => {
                      const itemNames = o.items ? o.items.map(i => i.product).join('; ') : o.product;
                      const totalQty = o.items ? o.items.reduce((sum, i) => sum + i.quantity, 0) : o.quantity;
                      const totalAmt = o.totalAmount || o.amount;
                      return [o.id, o.customerName, o.customerEmail || "N/A", `"${o.companyAddress || "Online Order"}"`, itemNames, String(totalQty), String(totalAmt), o.date, o.status];
                    }),
                  ];
                  const csv = rows.map((r) => r.join(",")).join("\n");
                  const blob = new Blob([csv], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url; a.download = "orders.csv"; a.click();
                }}
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Order ID</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Qty</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16 text-muted-foreground">
                      <div className="flex flex-col items-center gap-2">
                        <Package className="w-10 h-10 text-muted-foreground/40" />
                        <span>No orders found</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((order) => (
                    <tr key={order.id} className="hover:bg-muted/20 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-semibold text-primary bg-primary/8 px-2 py-1 rounded">
                          {order.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-foreground">{order.customerName}</p>
                        {order.companyAddress && (
                          <p className="text-xs text-muted-foreground mt-0.5 max-w-[180px] truncate" title={order.companyAddress}>
                            📍 {order.companyAddress}
                          </p>
                        )}
                        {order.customerEmail && (
                          <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[180px]" title={order.customerEmail}>
                            ✉️ {order.customerEmail}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4 max-w-[220px]">
                        {order.items ? (
                          <>
                            <p className="font-medium text-foreground truncate" title={order.items.map(i => i.product).join(", ")}>
                              {order.items.length === 1 ? order.items[0].product : `Multiple Items (${order.items.length})`}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {order.items.length === 1 ? order.items[0].category : "Mixed Categories"}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="font-medium text-foreground truncate" title={order.product}>{order.product}</p>
                            <p className="text-xs text-muted-foreground">{order.category}</p>
                          </>
                        )}
                      </td>
                      <td className="px-6 py-4 text-foreground font-medium">
                        {order.items ? order.items.reduce((sum, i) => sum + i.quantity, 0) : order.quantity}
                      </td>
                      <td className="px-6 py-4 text-foreground font-semibold">
                        ₹{(order.totalAmount || order.amount || 0).toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{order.date}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 text-right relative">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setViewOrder(order)}
                            title="View Details"
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenu(openMenu === order.id ? null : order.id)}
                              className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>

                            {openMenu === order.id && (
                              <div className="absolute right-0 top-full mt-1 bg-background border border-border rounded-lg shadow-xl z-50 py-1 w-44 text-left">
                                <p className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border mb-1">
                                  Change Status
                                </p>
                                {(["PENDING", "CONFIRMED", "CANCELLED"] as Status[]).map((s) => (
                                  <button
                                    key={s}
                                    disabled={order.status === s}
                                    onClick={() => updateStatus(order.id, s)}
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-muted text-foreground disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
                                  >
                                    {s === "CONFIRMED" && <span className="text-emerald-600 font-medium">✓ Confirm</span>}
                                    {s === "PENDING"   && <span className="text-amber-600 font-medium">⏳ Mark Pending</span>}
                                    {s === "CANCELLED" && <span className="text-red-500 font-medium">✕ Cancel</span>}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-3 border-t border-border bg-muted/10 flex items-center justify-between text-xs text-muted-foreground">
            <span>Showing <strong className="text-foreground">{filtered.length}</strong> of <strong className="text-foreground">{total}</strong> orders</span>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span><strong className="text-foreground">{confirmed}</strong> confirmed orders this period</span>
            </div>
          </div>
        </div>
      </div>

      {/* View Order Modal */}
      {viewOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm print:p-0 print:bg-white">
          <div className="bg-background border border-border sm:rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] print:max-h-[none] print:border-none print:shadow-none animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header containing Actions (Hidden when printing) */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/10 print:hidden">
              <h3 className="font-heading font-bold text-lg text-foreground flex items-center gap-2">
                <Receipt className="w-5 h-5 text-primary" />
                Invoice Details
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => window.print()}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 h-9"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </Button>
                <button
                  onClick={() => setViewOrder(null)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Invoice Content */}
            <div className="p-8 overflow-y-auto bg-white text-black print:overflow-visible">
              
              {/* Invoice Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-gray-200">
                <div>
                  <h1 className="text-3xl font-heading font-bold text-[#0f766e] mb-1">Naval Soap Factory</h1>
                  <p className="text-gray-600 text-sm font-medium">Silver Detergent Private Limited</p>
                  <div className="text-gray-500 text-sm mt-2 space-y-0.5">
                    <p>6/D/1, Anand Industrial Estate, Borsad Road,</p>
                    <p>ANAND - 388 001. (Guj.)</p>
                    <p className="mt-2 flex items-center gap-1"><span className="font-medium text-gray-600">Ph:</span> +91 98258 21075, +91 98258 05478</p>
                    <p className="flex items-center gap-1 font-mono text-xs mt-1"><span className="font-medium text-gray-600 font-sans text-sm">GSTIN:</span> 24XXXXX1234X1Z5</p>
                  </div>
                </div>
                <div className="mt-8 md:mt-0 text-left md:text-right">
                  <h2 className="text-3xl font-bold text-gray-800 tracking-tight mb-2">INVOICE</h2>
                  <div className="space-y-1">
                    <p className="text-gray-500 text-sm">Invoice No: <span className="text-gray-900 font-mono font-medium ml-1">{viewOrder.id}</span></p>
                    <p className="text-gray-500 text-sm">Date: <span className="text-gray-900 font-medium ml-1">{viewOrder.date}</span></p>
                    <div className="flex items-center md:justify-end gap-2 mt-2 pt-2 border-t border-gray-100">
                      <span className="text-gray-500 text-sm">Status:</span>
                      <StatusBadge status={viewOrder.status} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Info */}
              <div className="flex flex-col sm:flex-row gap-8 mb-10">
                <div className="flex-1 bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Billed To</h4>
                  <p className="font-bold text-gray-900 text-lg mb-1">{viewOrder.customerName}</p>
                  
                  {viewOrder.companyAddress ? (
                    <p className="text-gray-600 flex items-start gap-2 text-sm max-w-[250px] leading-relaxed">
                      <span className="mt-0.5 line-clamp-3">{viewOrder.companyAddress}</span>
                    </p>
                  ) : (
                    <p className="text-gray-500 italic text-sm">No address provided</p>
                  )}
                  
                  {viewOrder.customerEmail && (
                    <p className="text-[#0f766e] mt-3 flex items-center gap-1.5 text-sm font-medium">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${viewOrder.customerEmail}`} className="hover:underline">{viewOrder.customerEmail}</a>
                    </p>
                  )}
                </div>
                {/* Space for shipping/other info if needed later */}
                <div className="flex-1 hidden sm:block"></div>
              </div>

              {/* Order Items Table */}
              <div className="mb-10 rounded-xl overflow-hidden border border-gray-200">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr className="text-gray-500 text-xs uppercase tracking-wider font-semibold">
                      <th className="py-4 px-5">Item Description</th>
                      <th className="py-4 px-5 text-center">HSN/SAC</th>
                      <th className="py-4 px-5 text-center">Qty</th>
                      <th className="py-4 px-5 text-right">Unit Rate</th>
                      <th className="py-4 px-5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {viewOrder.items ? (
                      viewOrder.items.map((item, idx) => (
                        <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-5">
                            <p className="font-semibold text-gray-900">{item.product}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
                          </td>
                          <td className="py-4 px-5 text-center text-xs text-gray-600 font-mono">
                            3401
                          </td>
                          <td className="py-4 px-5 text-center font-medium text-gray-700">{item.quantity}</td>
                          <td className="py-4 px-5 text-right text-gray-600">₹{(item.amount / item.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                          <td className="py-4 px-5 text-right font-bold text-gray-900">₹{item.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="py-4 px-5">
                          <p className="font-semibold text-gray-900">{viewOrder.product}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{viewOrder.category}</p>
                        </td>
                        <td className="py-4 px-5 text-center text-xs text-gray-600 font-mono">
                          3401
                        </td>
                        <td className="py-4 px-5 text-center font-medium text-gray-700">{viewOrder.quantity}</td>
                        <td className="py-4 px-5 text-right text-gray-600">₹{((viewOrder.amount || 0) / (viewOrder.quantity || 1)).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                        <td className="py-4 px-5 text-right font-bold text-gray-900">₹{(viewOrder.amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Totals Section */}
              <div className="flex justify-end pt-2">
                <div className="w-full sm:w-1/2 md:w-5/12 bg-gray-50 p-6 rounded-xl border border-gray-100">
                  
                  {viewOrder.subtotal !== undefined ? (
                    <>
                      <div className="flex justify-between text-gray-600 mb-2 text-sm">
                        <span>Subtotal</span>
                        <span className="font-medium text-gray-900">₹{viewOrder.subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 mb-2 text-sm">
                        <span>CGST (9%)</span>
                        <span className="font-medium text-gray-900">₹{(viewOrder.gstAmount! / 2).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 mb-4 text-sm">
                        <span>SGST (9%)</span>
                        <span className="font-medium text-gray-900">₹{(viewOrder.gstAmount! / 2).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between text-gray-600 mb-4 text-sm">
                      <span>Subtotal (Incl. Tax)</span>
                      <span className="font-medium text-gray-900">
                        ₹{(viewOrder.totalAmount || viewOrder.amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-end pt-4 border-t border-gray-200 mt-2">
                    <span className="font-bold text-gray-400 uppercase text-xs tracking-wider">Grand Total</span>
                    <span className="font-bold text-[#0f766e] text-2xl">
                      ₹{(viewOrder.totalAmount || viewOrder.amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Invoice Footer */}
              <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
                <div className="text-left mb-6 sm:mb-0">
                  <p className="font-semibold text-gray-800 mb-1">Terms & Conditions</p>
                  <p className="text-gray-500 text-xs 1leading-relaxed max-w-sm">All goods sold are non-returnable. Subject to ANAND jurisdiction. This is a computer generated invoice.</p>
                </div>
                <div className="text-center sm:text-right border-t sm:border-t-0 border-gray-200 pt-6 sm:pt-0 w-full sm:w-auto">
                  <p className="font-bold text-gray-800 text-sm mb-8">For, Naval Soap Factory</p>
                  <p className="text-gray-400 text-xs italic">Authorized Signatory</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
