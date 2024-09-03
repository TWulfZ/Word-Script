import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import { Switch } from '@/components/ui/switch';
import ColorBadge from '../../ColorBadge';
import { cn } from '@/lib/utils';
import { useConfigStore } from '@/zustand/store';

interface AdvancedOptions {
  savePDF: boolean;
  mergePDFs: boolean;
}

const AdvancedOptions = () => {
  const [advancedOptionsOpen, setAdvancedOptionsOpen] = useState(false);
  const { options, setOptions } = useConfigStore();

  const handleOptionChange = (option: keyof AdvancedOptions, value: boolean) => {
    const newOption = { ...options, [option]: value };
    if (option === 'savePDF' && !value) {
      // Add options that depend on savePDF
      newOption.mergePDFs = false;
    }
    setOptions(newOption);
  };

  return (
    <Collapsible open={advancedOptionsOpen} onOpenChange={setAdvancedOptionsOpen} className='w-64 space-y-2'>
      <CollapsibleTrigger asChild>
        <Button variant='outline' className='w-full justify-between'>
          Opciones avanzadas
          {advancedOptionsOpen ? <ChevronUpIcon className='h-4 w-4' /> : <ChevronDownIcon className='h-4 w-4' />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={cn(
          'text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
        )}
      >
        <Option option='savePDF' checked={options.savePDF} handleOptionChange={handleOptionChange} label='Formato PDF'>
          Genera los documentos en formato <ColorBadge>.pdf</ColorBadge>
        </Option>
        <Option
          option='mergePDFs'
          checked={options.mergePDFs}
          disabled={!options.savePDF}
          handleOptionChange={handleOptionChange}
          label='Unir PDFs'
        >
          Une todos los archivos PDF generados en uno solo
        </Option>
      </CollapsibleContent>
    </Collapsible>
  );
};

interface OptionProps {
  option: keyof AdvancedOptions;
  checked: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
  handleOptionChange: (option: keyof AdvancedOptions, value: boolean) => void;
}

const Option = ({ option, checked, disabled, label, children, handleOptionChange }: OptionProps) => {
  return (
    <div className='flex items-center justify-between border-b p-2'>
      <div className='space-y-0.5'>
        <Label htmlFor='enable-logging'>{label}</Label>
        <p className='text-sm text-muted-foreground'>{children}</p>
      </div>
      <Switch
        id={option}
        checked={checked}
        disabled={disabled}
        onCheckedChange={(checked) => handleOptionChange(option, checked as boolean)}
      />
    </div>
  );
};

export default AdvancedOptions;
