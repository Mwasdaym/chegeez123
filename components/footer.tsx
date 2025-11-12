export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <a href="#" className="hover:text-accent transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-4">Support</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <a href="#" className="hover:text-accent transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <a href="#" className="hover:text-accent transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-4">Follow Us</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <a href="#" className="hover:text-accent transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-muted-foreground text-sm">
            © 2025 MovieBox. All rights reserved. Powered by Gifted Tech API.
          </p>
        </div>
      </div>
    </footer>
  )
}
