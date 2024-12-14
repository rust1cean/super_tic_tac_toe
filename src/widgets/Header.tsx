import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full z-50 h-[8vh] bg-transparent backdrop-blur flex justify justify-between items-center px-8 py-10 gap-4">
      <Button variant="outline">
        <FaHome />
        Home
      </Button>
      <a target="_blank" href="https://github.com/rust1cean/super_tic_tac_toe">
        <label className="flex gap-4 items-center cursor-pointer">
          <strong>@rust1cean</strong>
          <FaGithub size="32" />
        </label>
      </a>
    </header>
  );
}
