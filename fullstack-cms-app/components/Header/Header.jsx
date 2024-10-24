import Logo from "@/assets/Vector.png"
import Image from "next/image"
export default function Header() {
  return (
    <div className="flex justify-between p-5 bg-gray-900">
      <div className="flex items-center">
        <Image src={Logo} alt="Logo" className="mr-3"></Image>
        <p className="text-white font-semibold text-lg">Laravel Nova</p>
      </div>

    </div>
  )
}