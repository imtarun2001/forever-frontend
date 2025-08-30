import Product from '../common/Product'

const Products = ({ filterProducts }) => {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
      {
        filterProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))
      }
    </div>
  )
}
export default Products