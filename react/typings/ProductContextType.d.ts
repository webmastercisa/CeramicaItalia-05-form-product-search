export interface ProductContext {
    loadingItem: boolean;
    product: Product;
    selectedItem: Item;
    selectedQuantity: number;
    skuSelector: SkuSelector;
    buyButton: BuyButton;
    assemblyOptions: AssemblyOptions;
  }
export interface ProductContextSummary {
    product: Product;
    isHovering: boolean;
    isLoading: boolean;
    isPriceLoading: boolean;
    selectedItem: Item;
    selectedQuantity: number;
    listName?: any;
    inView: boolean;
  }
  
  interface AssemblyOptions {
    items: Items;
    inputValues: Items;
    areGroupsValid: Items;
  }
  
  interface Items {
  }
  
  interface BuyButton {
    clicked: boolean;
  }
  
  interface SkuSelector {
    selectedImageVariationSKU?: any;
    isVisible: boolean;
    areAllVariationsSelected: boolean;
  }
  
  interface Product {
    cacheId: string;
    productId: string;
    description: string;
    productName: string;
    productReference: string;
    linkText: string;
    brand: string;
    brandId: number;
    link: string;
    categories: string[];
    categoryId: string;
    priceRange: PriceRange;
    specificationGroups: SpecificationGroup[];
    skuSpecifications?: SkuSpecification[];
    productClusters: ProductCluster[];
    clusterHighlights: any[];
    properties: Property[];
    __typename: string;
    titleTag: string;
    metaTagDescription: string;
    items: Item[];
    itemMetadata: ItemMetadata;
  }
  
  interface ItemMetadata {
    items: Item2[];
    priceTable: any[];
    __typename: string;
  }
  
  interface Item2 {
    id: string;
    name: string;
    imageUrl: string;
    seller: string;
    assemblyOptions: AssemblyOption[];
    __typename: string;
  }
  
  interface AssemblyOption {
    id: string;
    name: string;
    required: boolean;
    inputValues: InputValue[];
    composition?: any;
    __typename: string;
  }
  
  interface InputValue {
    label: string;
    maxLength: number;
    type: string;
    domain?: any;
    defaultValue: string;
    __typename: string;
  }
  
  interface Item {
    itemId: string;
    name: string;
    nameComplete: string;
    complementName: string;
    ean: string;
    variations: any[];
    referenceId: ReferenceId[];
    measurementUnit: string;
    unitMultiplier: number;
    images: Image[];
    __typename: string;
    videos: any[];
    sellers: Seller[];
    kitItems: any[];
    attachments: Attachment[];
    estimatedDateArrival?: any;
  }
  
  interface Attachment {
    id: string;
    name: string;
    required: boolean;
    __typename: string;
  }
  
  interface Seller {
    sellerId: string;
    sellerName: string;
    sellerDefault: boolean;
    __typename: string;
    addToCartLink: string;
    commertialOffer: CommertialOffer;
  }
  
  interface CommertialOffer {
    discountHighlights: any[];
    teasers: any[];
    Price: number;
    ListPrice: number;
    Tax: number;
    taxPercentage: number;
    spotPrice: number;
    PriceWithoutDiscount: number;
    RewardValue: number;
    PriceValidUntil: string;
    AvailableQuantity: number;
    __typename: string;
    CacheVersionUsedToCallCheckout: string;
    Installments: Installment[];
  }
  
  interface Installment {
    Value: number;
    InterestRate?: number;
    TotalValuePlusInterestRate: number;
    NumberOfInstallments: number;
    Name: string;
    PaymentSystemName: string;
    __typename: string;
  }
  
  interface Image {
    cacheId: string;
    imageId: string;
    imageLabel: string;
    imageTag: string;
    imageUrl: string;
    imageText: string;
    __typename: string;
  }
  
  interface ReferenceId {
    Key: string;
    Value: string;
    __typename: string;
  }
  
  interface Property {
    name: string;
    values: string[];
    __typename: string;
  }
  
  interface ProductCluster {
    id: string;
    name: string;
    __typename: string;
  }

  interface SkuSpecification {
    field: Field;
    values: Field[];
    __typename: string;
  }
  
  interface Field {
    name: string;
    originalName: string;
    __typename: string;
  }  
  interface SpecificationGroup {
    name: string;
    originalName: string;
    specifications: Specification[];
    __typename: string;
  }
  
  interface Specification {
    name: string;
    originalName: string;
    values: string[];
    __typename: string;
  }
  
  interface PriceRange {
    sellingPrice: SellingPrice;
    listPrice: SellingPrice;
    __typename: string;
  }
  
  interface SellingPrice {
    highPrice: number;
    lowPrice: number;
    __typename: string;
  }
  
