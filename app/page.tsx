import FacultyTable from "@/components/FacultyTable/FacultyTable";
import CourseTable from "@/components/CourseTable/CourseTable";
import Fields from "@/components/Fields";
import SubjectTable from "@/components/SubjectTable/SubjectTable";

export default function Home() {
  return (
    <main className="dark:bg-zinc-950/[0.7]">
      <section className="py-8 border-b dark:border-zinc-800">
        <Fields />
      </section>
      <section className="pt-5 pb-4 dark:bg-zinc-900/30 border-b dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0">
          <FacultyTable />
          <CourseTable />
        </div>
      </section>
      <section className="pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
          <SubjectTable />
        </div>
      </section>
    </main>
  );
}
