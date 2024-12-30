export const Contact = () => {
  return (
    <section className="py-32">
      <div className="grid grid-cols-2 gap-16">
        {/* Contact Information */}
        <div className="space-y-2">
          <div className="flex justify-between border-t border-[#DAD2C2] py-1">
            <span className="uppercase text-[1.1rem] tracking-wider">EMAIL</span>
            <span className="text-[1.1rem]">info@midmac.design</span>
          </div>    
          <div className="flex justify-between border-t border-[#DAD2C2] py-1">
            <span className="uppercase text-[1.1rem] tracking-wider">INSTAGRAM</span>
            <span className="text-[1.1rem]">midmac.design</span>
          </div>
          <div className="flex justify-between border-t border-[#DAD2C2] border-b py-1">
            <span className="uppercase text-[1.1rem] tracking-wider">PHONE</span>
            <span className="text-[1.1rem]">+966 56 322 2396</span>
          </div>
        </div>

        {/* Contact Us Title */}
        <div className="flex items-center justify-end">
          <h2 className="text-[4rem] font-light uppercase">CONTACT US</h2>
        </div>
      </div>
    </section>
  )
}