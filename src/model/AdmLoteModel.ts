export interface AdmLoteModel {
  loteid: string // Char(6)
  estado: string // Char(1)
  fdelete: string // Char(1)
  bcreado: string // VarChar(100)
  bmodificado?: string // VarChar(100), nullable
  beliminado?: string // VarChar(100), nullable
  programa: string // Char(5)
  numero: string // Char(3)
  manzana?: string // Char(1), nullable
  nlote?: number // Int?, nullable
  area: number // Decimal(11,2)
  condicion?: string // VarChar(250), nullable
  npartidaelectronica?: string // VarChar(20), nullable

  // Linderos
  linderomed1?: number // Decimal(11,2), nullable
  linderonom1?: string // VarChar(50), nullable
  linderomed2?: number
  linderonom2?: string
  linderomed3?: number
  linderonom3?: string
  linderomed4?: number
  linderonom4?: string
  linderomed5?: number
  linderonom5?: string

  // Fechas minutas
  minutasolicitud?: Date
  minutafgg?: Date
  minutaeal?: Date
  minutaral?: Date
  minutaeat?: Date
  minutarat?: Date
  minutaec?: Date
  minutarc?: Date
  minutaem?: Date
  minutaep?: Date

  // Relaciones
  adm_programa?: AdmPrograma
  adm_lote_precioventa?: AdmLotePrecioVenta[]
}

export interface AdmLotePrecioVenta {
  precioventaid: string // Char(8)
  loteid: string // Char(6)
  fecha: Date // Date
  precioventa: number // Decimal(11,4) -> number en TS
  estado: string // Char(1)

  // relación con adm_lote
  adm_lote?: AdmLoteModel
}

export interface AdmPrograma {
  programaid: string // Char(5)
  estado: string // Char(1)
  fdelete: string // Char(1)
  bcreado: string // VarChar(100)
  bmodificado?: string // VarChar(100), nullable
  beliminado?: string // VarChar(100), nullable
  terrenoid: string // Char(5)
  notariaid: string // Char(6), default "0"
  unidadcatastral: number // Int
  ajustecm: number // Decimal(11,2)
  contrato?: string // VarChar(6), nullable
  autovaluo1: number // Decimal(11,2)
  autovaluo2: number // Decimal(11,2)
  cuentadebe?: number // Int?, nullable
  cuentahaber?: number // Int?, nullable

  adm_terreno?: AdmTerreno
}

export interface AdmTerreno {
  terrenoid: string // Char(5)
  estado: string // Char(1), default "1"
  fdelete: string // Char(1)
  bcreado: string // VarChar(100)
  bmodificado?: string // VarChar(100), nullable
  beliminado?: string // VarChar(100), nullable
  nombre: string // VarChar(250)
  areatotal: number // Decimal(11,2)
  costo: number // Decimal(11,2)
  preciocompra: number // Decimal(11,2)
  cuotainicial: number // Decimal(11,2)
  fechac: Date // Date
  fechaci?: Date // Date, nullable
  nrecibo?: string // VarChar(20), nullable
  areatotalventa: number // Decimal(11,2)
  nlotes: number // Int
  distrito: string // Char(6)
  municipalidad: string // Char(6)
  npartidaelectronica: string // VarChar(60)
  unidadcatastral: string // VarChar(60)
  proveedor: string // Char(8)
  ubicacion: string // VarChar(250)
  nletras: number // Int
  fechav?: Date // Date, nullable
  valorc: number // Decimal(11,2)
  valoruc: number // Decimal(11,2)

  gen_ubigeo?: GenUbigeo
}

export interface GenUbigeo {
  ubigeo: string // id (char(6))
  provincia?: string // opcional
  distrito?: string // opcional
  departamento: string
  estado: string
}
