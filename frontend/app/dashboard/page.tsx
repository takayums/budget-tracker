import StatCard from "@/components/StatCard";

function DashboardPage() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* State Card */}
        <StatCard />
        <StatCard />
        <StatCard />
        <StatCard />
      </div>
    </section>
  );
}

export default DashboardPage;
