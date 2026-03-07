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
  customerEmail: string;
  items?: OrderItem[]; // Optional for backwards compatibility with old placed orders
  product?: string;     // Old format
  category?: string;    // Old format
  quantity?: number;    // Old format
  amount?: number;      // Old format
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
          <div className="col-span-2 lg:col-span-4 xl:col-span-1 bg-primary rounded-xl p-5 flex items-center gap-4 shadow-sm">
            <div className="bg-white/20 rounded-xl p-3">
              <IndianRupee className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-white/70 uppercase tracking-wide font-medium">Revenue</p>
              <p className="text-2xl font-bold text-white mt-0.5">₹{revenue.toLocaleString("en-IN")}</p>
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
                    ["Order ID","Customer","Email","Items","Total Qty","Total Amount","Date","Status"],
                    ...filtered.map((o) => {
                      const itemNames = o.items ? o.items.map(i => i.product).join('; ') : o.product;
                      const totalQty = o.items ? o.items.reduce((sum, i) => sum + i.quantity, 0) : o.quantity;
                      const totalAmt = o.totalAmount || o.amount;
                      return [o.id, o.customerName, o.customerEmail, itemNames, String(totalQty), String(totalAmt), o.date, o.status];
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
                        <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background border border-border rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="font-heading font-bold text-lg text-foreground">Order Details</h3>
              <button
                onClick={() => setViewOrder(null)}
                className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                  <p className="font-mono font-bold text-primary">{viewOrder.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Date Placed</p>
                  <p className="font-medium text-foreground">{viewOrder.date}</p>
                </div>
              </div>

              <div className="bg-muted/20 border border-border rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider border-b border-border pb-2">Customer Info</h4>
                <div>
                  <p className="font-semibold text-foreground text-lg">{viewOrder.customerName}</p>
                  <p className="text-sm text-muted-foreground">{viewOrder.customerEmail}</p>
                </div>
              </div>

              <div className="bg-muted/20 border border-border rounded-xl p-4 space-y-4">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider border-b border-border pb-2">Order Items</h4>
                
                <div className="space-y-4">
                  {viewOrder.items ? (
                    viewOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-foreground">{item.product}</p>
                          <p className="text-sm text-muted-foreground mt-0.5">{item.category}</p>
                        </div>
                        <div className="text-right whitespace-nowrap">
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="font-bold text-foreground mt-1">₹{item.amount.toLocaleString("en-IN")}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-foreground">{viewOrder.product}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{viewOrder.category}</p>
                      </div>
                      <div className="text-right whitespace-nowrap">
                        <p className="text-sm text-muted-foreground">Qty: {viewOrder.quantity}</p>
                        <p className="font-bold text-foreground mt-1">₹{(viewOrder.amount || 0).toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <span className="font-bold text-muted-foreground uppercase text-xs tracking-wider">Total</span>
                  <span className="font-bold text-primary text-xl">₹{(viewOrder.totalAmount || viewOrder.amount || 0).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-sm font-medium text-muted-foreground">Current Status</p>
                <StatusBadge status={viewOrder.status} />
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-border bg-muted/10 text-right">
              <Button onClick={() => setViewOrder(null)} variant="outline" className="px-8 border-border">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
