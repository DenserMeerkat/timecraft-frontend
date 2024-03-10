import FacultyTable from "@/components/FacultyTable/FacultyTable";
import CourseTable from "@/components/CourseTable/CourseTable";
import EventTable from "@/components/EventTable/EventTable";
import Fields from "@/components/Fields";
import GenerateButton from "@/components/CraftTable.tsx/GenerateButton";
import CraftTables from "@/components/CraftTable.tsx/CraftTables";

export default function Home() {
  return (
    <main className="dark:bg-zinc-950/[0.7]">
      <section className="border-b py-8 dark:border-zinc-800">
        <Fields />
      </section>
      <section className="border-b pb-4 pt-5 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 2xl:px-0">
          <FacultyTable className="mb-10" />
          <CourseTable />
          <EventTable />
        </div>
      </section>
      <section className="pb-4 pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-0">
          <GenerateButton />
          <CraftTables />
        </div>
      </section>
    </main>
  );
}
