import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { AdminCardProps } from "@/types/AdminCardProps";
import { Icons } from "@/components/Icons";

const AdminSideBar: React.FC<Pick<AdminCardProps, 'selectedTab'>>= ({ selectedTab }) => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-20">
      
          <span className="sr-only">Acme Inc</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipContent side="right">Commandes</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/produits"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  selectedTab === 'produits' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                }`}
              >
                <Icons.shoppingBasket className="h-6 w-6 cursor-pointer" />
                <span className="sr-only">Produits</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Produits</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/categories"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  selectedTab === 'categories' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                }`}
              >
                <Icons.chartBarStacked className="h-6 w-6 cursor-pointer" />
                <span className="sr-only">Catégories</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Catégories</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipContent side="right">Paramètres</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
    
  );
};

export default AdminSideBar;