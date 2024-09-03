import { Button } from '@/components/ui/button'
import { useConfigStore, useDataStore } from '@/zustand/store';
import { FileTextIcon } from 'lucide-react'

const Footer = () => {
  const { csvData} = useDataStore()
  const { columns } = useConfigStore();

  return (
    <footer className="flex justify-end transition-all duration-300 ease-in-out">
          <Button disabled={csvData.length === 0 || Object.keys(columns).length === 0}>
            <FileTextIcon className="mr-2 h-4 w-4" />
            Generar Documentos
          </Button>
        </footer>
  )
}

export default Footer
