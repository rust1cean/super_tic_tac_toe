import { FaGithub } from "react-icons/fa";

export function Header() {
  return (
    <header className="w-full z-50 h-[8vh] bg-transparent backdrop-blur flex justify flex-row-reverse items-center px-8 py-10 gap-4">
      <a target="_blank" href="https://github.com/rust1cean">
        <label className="flex gap-4 items-center cursor-pointer">
          <strong>@rust1cean</strong>
          <FaGithub size="32" />
        </label>
      </a>
    </header>
  );
}
