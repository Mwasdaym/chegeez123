export default function Footer() {
  return (
    <footer className="bg-black border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-foreground mb-4 text-sm md:text-base">Company</h3>
            <ul className="space-y-3 text-muted-foreground text-xs md:text-sm">
              <li>
                <a href="#" className="hover:text-foreground transition duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition duration-200">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition duration-200">
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-4 text-sm md:text-base">Support</h3>
            <ul className="space-y-3 text-muted-foreground text-xs md:text-sm">
              <li>
                <a href="#" className="hover:text-foreground transition duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition duration-200">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition duration-200">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-4 text-sm md:text-base">Legal</h3>
            <ul className="space-y-3 text-muted-foreground text-xs md:text-sm">
              <li>
                <a href="#" className="hover:text-foreground transition duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition duration-200">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-4 text-sm md:text-base">Follow</h3>
            <ul className="space-y-3 text-muted-foreground text-xs md:text-sm">
              <li>
                <a href="#" className="hover:text-foreground transition duration-200">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition duration-200">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition duration-200">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8">
          <p className="text-center text-muted-foreground text-xs md:text-sm">
            © 2025 UNLIMITED STREAM. All rights reserved. Powered by Gifted Tech.
          </p>
        </div>
      </div>
    </footer>
  )
}
