import { Pages } from "../context/Context"

export interface PagesContextData {
    pageSelect:Pages
    productsSearch:ProductsSearch | undefined
    facetsLoading:boolean
    setStateFormData: (data: FormDataI, endPage?: boolean) => void
    formData: FormDataI
    checkString:string
    onSelectFiltersData:(filter:filtersDataSelect)=>void
    filtersDataSelect: filtersDataSelect
    setFacets: (facets: FacetsAwaitSelect[]) => void
    facetsItems: FacetsData | undefined
    setPage:(page:Pages)=>void
    setShowMore:()=>void
    getDataResult:()=>void
    SummaryQuickView:() => JSX.Element | null
    SummaryHighlights:() => JSX.Element | null
    SummaryName:() => JSX.Element | null
    SummarySellingPrice:() => JSX.Element | null
    SummaryPromotion:() => JSX.Element | null
    SummaryQuantity:() => JSX.Element | null
    SummaryCondShelf:() => JSX.Element | null
    area: Area[]
    transform: Transform[]
    listFiltersShow:boolean
}
export interface TypeProject {
  __editorItemTitle: string;
  urlImg: string;
  filtersData: FiltersDatum[];
}
export interface FacetsData {
    facets: Facet[]
    breadcrumb: any[]
    queryArgs: QueryArgs
}
export interface Facet {
    name: string
    values: Value[]
    type: string
    hidden: boolean
}
export interface ProductsSearch {
    recordsFiltered: number
    products: ProductsIds[]
}
export interface ProductsIds {
    productId: string
    items: Items[]
}
export interface Items {
    itemId: string
}
interface Value {
    id?: string
    name: string
    quantity: number
    key: string
    value?: string
    selected: boolean
  }
  
interface QueryArgs {
    map?: any
    query: string
    selectedFacets: SelectedFacet[]
}
interface SelectedFacet {
    key: string
    value: string
}
export interface FacetsSelect {
    key: string
    value: string
}
export interface FacetsAwaitSelect {
    key: string
    value: string
    select: boolean
}
export interface FiltersData {
    id: string;
    text: string;
}
export interface FormDataI {
    name: string;
    email: string;
    checkTerm: boolean;
    department: SelectOpt;
    city: SelectOpt;
    areaSelect: string;
    spaceSelect: string;
    locationSelect: string;
    endPage:boolean
}
export interface SelectOpt {
    id: string
    label: string
}
export type FormType = "name" | "email" | "department" | "city" | "spaceSelect" | "locationSelect" | "areaSelect"



export interface Transform {
    __editorItemTitle: string;
    urlImg: string;
    typeProject: TypeProject[];
  }
export interface Area {
    __editorItemTitle: string;
    urlImg: string;
    filtersData: FiltersDatum[];
}
  
export interface FiltersDatum {
    keyCategory: string;
    __editorItemTitle: string;
}

export interface UseRenderSession {
    session: Session;
    loading: boolean;
}

interface Session {
  id: string;
  namespaces: Namespaces;
}

interface Namespaces {
  account: Account;
  store: Store;
  public: Public;
  profile: Profile;
  authentication: Authentication;
}

interface Authentication {
  storeUserId: AccountName;
  storeUserEmail: AccountName;
}

interface Profile {
  isAuthenticated: AccountName;
  id?: AccountName;
  email?: AccountName;
  firstName?: AccountName;
  lastName?: AccountName;
  phone?: AccountName;
}

interface Public {
}

interface Store {
  channel: AccountName;
  countryCode: AccountName;
  cultureInfo: AccountName;
  currencyCode: AccountName;
  currencySymbol: AccountName;
  admin_cultureInfo: AccountName;
}

interface Account {
  id: Id;
  accountName: AccountName;
}

interface AccountName {
  value: string;
}

interface Id {
  value: string;
  keepAlive: boolean;
}