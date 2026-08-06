export const PRODUCT_SELECT = `
  *,
  brands (
    id,
    name,
    slug
  ),
  categories (
    id,
    name,
    slug
  )
`;