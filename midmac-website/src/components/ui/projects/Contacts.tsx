export const Contact = () => {
  return (
    <section className="py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Contact Information */}
        <div className="space-y-2">
          <div className="flex justify-between md:flex-row items-start md:items-center border-t border-[#DAD2C2] py-1 gap-2">
            <span className="uppercase text-sm md:text-[1.1rem] tracking-wider">EMAIL</span>
            <a 
              href="mailto:info@midmac.design"
              className="text-sm md:text-[1.1rem] transition-colors"
            >
              info@midmac.design
            </a>
          </div>    
          <div className="flex justify-between md:flex-row items-start md:items-center border-t border-[#DAD2C2] py-1 gap-2">
            <span className="uppercase text-sm md:text-[1.1rem] tracking-wider">INSTAGRAM</span>
            <a 
              href="https://www.instagram.com/midmac.design/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm md:text-[1.1rem] transition-colors"
            >
              midmac.design
            </a>
          </div>
          <div className="flex justify-between md:flex-row items-start md:items-center border-t border-[#DAD2C2] border-b py-1 gap-2">
            <span className="uppercase text-sm md:text-[1.1rem] tracking-wider">PHONE</span>
            <a 
              href="https://wa.me/966563222396"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm md:text-[1.1rem] transition-colors"
            >
              +966 56 322 2396
            </a>
          </div>
        </div>

        {/* Right side - Dynamic Content */}
        <div className="flex items-center justify-start md:justify-end order-first md:order-last md:mb-0">
          <h2 className="text-[2rem] md:text-[4rem] font-light uppercase">CONTACT US</h2>
        </div>
      </div>
    </section>
  )
}