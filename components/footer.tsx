export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()}<a href="https://folio-lynkr-main.vercel.app/" className="font-bold text-primary"> Folio Lynkr </a> All rights reserved.
          </p>
          <p className="text-center text-sm text-muted-foreground md:text-right">Designed & Built with ❤️</p>
        </div>
      </div>
    </footer>
  )
}

