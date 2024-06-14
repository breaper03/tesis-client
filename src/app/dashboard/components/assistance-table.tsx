"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/custom/spinner'
import { DialogHeader, DialogFooter } from '@/components/ui/dialog'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Input } from '@/components/ui/input'
import { SquarePen, Trash2, SquarePlus, FileDown, Plus } from 'lucide-react'
import ReusableTable from '../../../components/custom/reusable-table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import CustomFileInput from '@/components/custom/file-input'
import { CreateAssistanceSchema, IAssistance } from '@/models/assistance.model'
import { findAllAssistance } from '@/api/assistance/assistance.api'

export const AssistanceTable = () => {

  const [assistance, setAssistance] = useState<IAssistance[]>([])
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const { data, status } = await findAllAssistance();
    if (status === 200) {
      setAssistance(data)
    }
  }

  const cols = [
    {key: "worker", header: "Trabajador", columnOrdering: true, actions: false},
    {key: "date", header: "Fecha", columnOrdering: true, actions: false},
    {key: "type", header: "Entrada/Salida", columnOrdering: true, actions: false},
  ];

  const templateCols = [
    {key: "name", header: "Producto/Servicio"},
    {key: "brand", header: "Marca"},
    {key: "model", header: "Variante"},
    {key: "price", header: "Precio"},
    {key: "category", header: "Categoría"},
  ]

  const customButton = (
    <div className='flex flex-row gap-2 items-center justify-between'>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <FileDown size={19}/>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex items-center justify-center w-[22rem] h-[22rem] py-2 m-0 px-1">
          <CustomFileInput  endpoint={"products"} cols={templateCols} refetch={getUsers}/>
        </PopoverContent>
      </Popover>
    </div>
  )

  interface ActionsProps {
    row: any,
  }

  const Actions = ({row}: ActionsProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [currentProduct, setCurrentProduct] = useState<IAssistance>()
    const [body, setBody] = useState<Omit<IAssistance, "id" | "_id" | "createdAt" | "updatedAt">>({
      worker: "",
      date: new Date(),
      type: "in",
    })
    const [bodyErrors, setBodyErrors] = useState({
      worker: false,
      date: false,
      type: false,
    })
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    
    useEffect(() => {
      const get: IAssistance = row.original
      setCurrentProduct(get)
    }, [row])

    const handleOnChange = (name: string, value: string) => {
      setBodyErrors({
        ...bodyErrors,
        [name]: false,
      })
      setBody({
        ...body, [name]: value
      })
    }

    const handleSubmit = async () => {
      try {
        setIsLoading(true)
        
        const obj = {
          firstname: body.worker !== "" ? body.worker : currentProduct?.worker !== undefined ? currentProduct.worker : "",
          lastname: typeof body.date !== "string" ? body.date : currentProduct?.date !== undefined ? currentProduct.date : "",
          password: body.type !== "in" ? body.type : currentProduct?.type !== undefined ? currentProduct.type : "",
        }

        const valid = CreateAssistanceSchema.safeParse(obj)

        if (valid.success) {
          // currentProduct?._id && await updateProducts(currentProduct._id, obj)
          await getUsers()
          setIsLoading(false)
          setEditDialogOpen(false)
        } else {
          const { worker, date, type } = valid.error.format()
          setBodyErrors({
            worker: worker?._errors ? true : false,
            date: date?._errors ? true : false,
            type: type?._errors ? true : false,
          })
        }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        return error
      }
    }

    const handleDelete = async () => {
      setIsLoading(true)
      try {
        // currentProduct?._id && await deleteProducts(currentProduct?._id)
        await getUsers()
        setDeleteDialogOpen(false)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        return error
      }
    }

    return (
      <DropdownMenu open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-7 w-7 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" forceMount>
          <DropdownMenuLabel>Opciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Dialog>
            <DialogTrigger 
              onClick={() => setEditDialogOpen(true)}
              className="relative hover:bg-hover w-full flex justify-between mb-1 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-hover cursor-pointer focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <span>Editar</span>
              <SquarePen size={16}/>
            </DialogTrigger>
            <DialogContent className='max-w-[30em]'>
              <DialogHeader>
                <DialogTitle>Editar Asistencia:</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Trabajador
                  </Label>
                  <Input
                    onChange={(event) => handleOnChange(event.target.name, event.target.value)}
                    name="name" 
                    defaultValue={currentProduct?.worker} 
                    className={`${bodyErrors.worker && "border-red-500"} col-span-3`} 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Fecha
                  </Label>
                  <Input
                    onChange={(event) => handleOnChange(event.target.name, event.target.value)}
                    name="brand" 
                    defaultValue={currentProduct?.date.toString()} 
                    className={`${bodyErrors.date && "border-red-500"} col-span-3`} 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Entrada/Salida
                  </Label>
                  <Input
                    onChange={(event) => handleOnChange(event.target.name, event.target.value)}
                    name="model" 
                    defaultValue={currentProduct?.type} 
                    className={`${bodyErrors.type && "border-red-500"} col-span-3`} 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" variant="outline" className='flex flex-row gap-2 items-center justify-between' onClick={() => handleSubmit()}>
                  <span>Guardar Cambios</span>
                  {isLoading && <Spinner size='small'/>}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* DELETE */}
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger 
              onClick={() => setDeleteDialogOpen(true)}
              className="relative bg-[#cd393990] focus:bg-[#cd3939] w-full flex justify-between select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-hover cursor-pointer focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <span>Eliminar</span>
              <Trash2 size={16}/>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Seguro que quiere eliminar este producto?</DialogTitle>
                <DialogDescription>
                  Esta accion es permanente.
                </DialogDescription>
              </DialogHeader>
              <div className='w-full flex flex-row gap-2'>
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className='w-full'>Cancelar</Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete()}
                  className="flex flex-row items-center w-full gap-2 justify-between "
                >
                  <span>Eliminar</span>
                  {isLoading && <Spinner size='small'/>}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const HeadActions = () => { 
    const [isLoading, setIsLoading] = useState(false)
    const [currentProduct, setCurrentProduct] = useState<IAssistance>()
    const [body, setBody] = useState<Omit<IAssistance, "id" | "_id" | "createdAt" | "updatedAt">>({
      worker: "",
      date: new Date(),
      type: "in",
    })
    const [bodyErrors, setBodyErrors] = useState({
      worker: false,
      date: false,
      type: false,
    })
    const [createDialogOpen, setCreateDialogOpen] = useState(false)

    const handleOnChange = (name: string, value: string) => {
      setBodyErrors({
        ...bodyErrors,
        [name]: false,
      })
      setBody({
        ...body, [name]: value
      })
    }

    const handleSubmit = async () => {
      setIsLoading(true)
      try {
        const valid = CreateAssistanceSchema.safeParse(body)
        console.log(valid)
        if (valid.success) {
          // await createProduct(body)
          await getUsers()
          setIsLoading(false)
          setCreateDialogOpen(false)
        } else {
          const { worker, date, type } = valid.error.format()
          setBodyErrors({
            worker: worker?._errors ? true : false,
            date: date?._errors ? true : false,
            type: type?._errors ? true : false,
          })
          setIsLoading(false)
        }
      } catch (error) {
        setIsLoading(false)
        return error
      }
    }

    return (
      <Dialog>
        <DialogTrigger 
          onClick={() => setCreateDialogOpen(true)}
        >
          <Button variant="ghost" className="h-7 w-7 p-0">
            <span className="sr-only">Abrir Menu</span>
            <Plus size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-[30em]'>
          <DialogHeader>
            <DialogTitle>Crear Asistencia:</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Trabajador
              </Label>
              <Input
                onChange={(event) => handleOnChange(event.target.name, event.target.value)}
                name="worker" 
                defaultValue={currentProduct?.worker} 
                className={`${bodyErrors.worker && "border-red-500"} col-span-3`} 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Fecha
              </Label>
              <Input
                onChange={(event) => handleOnChange(event.target.name, event.target.value)}
                name="date" 
                defaultValue={currentProduct?.date.toString()} 
                className={`${bodyErrors.date && "border-red-500"} col-span-3`} 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Entrada/Salida
              </Label>
              <Input
                onChange={(event) => handleOnChange(event.target.name, event.target.value)}
                name="type" 
                defaultValue={currentProduct?.type} 
                className={`${bodyErrors.type && "border-red-500"} col-span-3`} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button className='flex flex-row items-center gap-2 justify-between' variant="outline" type="submit" onClick={() => handleSubmit()}>
              <span>Aceptar</span>
              {isLoading && <Spinner size='small'/>}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <ReusableTable 
      data={assistance}
      cols={cols}
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
      showSelection={true}
      showActions
      Actions={Actions}
      HeadActions={HeadActions}
      customButtom={customButton}
    />
  )
}
