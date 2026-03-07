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
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────
type Status = "PENDING" | "CONFIRMED" | "CANCELLED";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  product: string;
  category: string;
  quantity: number;
  amount: number;
  date: string;
  status: Status;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const mockOrders: Order[] = [
  { id: "NSF-100123", customerName: "Ravi Patel", customerEmail: "ravipatel@gmail.com", product: "Naval Silver Detergent Powder – 5 kg Bag", category: "Detergent Powder", quantity: 10, amount: 2500, date: "2026-03-01", status: "CONFIRMED" },
  { id: "NSF-100124", customerName: "Sahil Mehta", customerEmail: "sahil@gmail.com", product: "Jambo Silver Detergent Cake", category: "Detergent Cake", quantity: 5, amount: 750, date: "2026-03-02", status: "PENDING" },
  { id: "NSF-100125", customerName: "Vishal Shah", customerEmail: "vishal@gmail.com", product: "Naval Silver Detergent Powder – 2 kg Bag", category: "Detergent Powder", quantity: 20, amount: 3200, date: "2026-03-03", status: "CONFIRMED" },
  { id: "NSF-100126", customerName: "Priya Joshi", customerEmail: "priya@gmail.com", product: "Blue Silver Detergent Cake", category: "Detergent Cake", quantity: 8, amount: 960, date: "2026-03-04", status: "CANCELLED" },
  { id: "NSF-100127", customerName: "Kushal Prajapati", customerEmail: "kushal@gmail.com", product: "Naval Silver Detergent Powder – 1 kg Bag", category: "Detergent Powder", quantity: 50, amount: 4500, date: "2026-03-05", status: "CONFIRMED" },
  { id: "NSF-100128", customerName: "Amit Verma", customerEmail: "amit@gmail.com", product: "Herbal Silver Detergent Cake", category: "Detergent Cake", quantity: 12, amount: 1440, date: "2026-03-05", status: "PENDING" },
  { id: "NSF-100129", customerName: "Neha Gupta", customerEmail: "neha@gmail.com", product: "Wonder Silver Detergent Cake", category: "Detergent Cake", quantity: 6, amount: 780, date: "2026-03-06", status: "CONFIRMED" },
  { id: "NSF-100130", customerName: "Deepak Singh", customerEmail: "deepak@gmail.com", product: "Naval Silver Detergent Powder – 500 gms Bag", category: "Detergent Powder", quantity: 100, amount: 5000, date: "2026-03-06", status: "PENDING" },
  { id: "NSF-100131", customerName: "Anjali Sharma", customerEmail: "anjali@gmail.com", product: "Jambo Ultra White Silver Detergent Cake", category: "Detergent Cake", quantity: 3, amount: 450, date: "2026-03-07", status: "CANCELLED" },
  { id: "NSF-100132", customerName: "Mohan Das", customerEmail: "mohan@gmail.com", product: "Naval Silver Detergent Powder – 150 gms Bag", category: "Detergent Powder", quantity: 200, amount: 3000, date: "2026-03-07", status: "CONFIRMED" },
];

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
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  // Guard: redirect if not authenticated
  useEffect(() => {
    if (localStorage.getItem("admin_auth") !== "true") {
      navigate("/admin");
    }
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
    .reduce((sum, o) => sum + o.amount, 0);

  // Filter + Search
  const filtered = orders.filter((o) => {
    const matchFilter = activeFilter === "ALL" || o.status === activeFilter;
    const q = search.toLowerCase();
    const matchSearch =
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.product.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const updateStatus = (id: string, status: Status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
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
                    ["Order ID","Customer","Email","Product","Category","Qty","Amount","Date","Status"],
                    ...filtered.map((o) => [o.id,o.customerName,o.customerEmail,o.product,o.category,String(o.quantity),String(o.amount),o.date,o.status]),
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
                        <p className="font-medium text-foreground truncate" title={order.product}>{order.product}</p>
                        <p className="text-xs text-muted-foreground">{order.category}</p>
                      </td>
                      <td className="px-6 py-4 text-foreground font-medium">{order.quantity}</td>
                      <td className="px-6 py-4 text-foreground font-semibold">₹{order.amount.toLocaleString("en-IN")}</td>
                      <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{order.date}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 text-right relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === order.id ? null : order.id)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>

                        {openMenu === order.id && (
                          <div className="absolute right-6 top-full mt-1 bg-background border border-border rounded-lg shadow-xl z-50 py-1 w-44 text-left">
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
    </div>
  );
};

export default AdminDashboard;
