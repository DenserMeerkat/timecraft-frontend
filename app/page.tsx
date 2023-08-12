import FacultyTable from "@/components/FacultyTable/FacultyTable";
import CourseTable from "@/components/CourseTable/CourseTable";
import Fields from "@/components/Fields";

export default function Home() {
  return (
    <main className="">
      <Fields />
      <div className="px-4 xl:px-0 max-w-6xl mx-auto pb-8">
        <FacultyTable />
        <CourseTable />
      </div>
    </main>
  );
}
