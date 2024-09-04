import { Button } from '@/components/ui/button'
import { useDataStore } from '@/zustand/store';
import { FileTextIcon } from 'lucide-react'

const Footer = () => {
  const { docFields } = useDataStore()
  return (
    <footer className="flex justify-end transition-all duration-300 ease-in-out">
          <Button disabled={!(docFields.foundFields.length > 0)}>
            <FileTextIcon className="mr-2 h-4 w-4" />
            Generar Documentos
          </Button>
        </footer>
  )
}

export default Footer