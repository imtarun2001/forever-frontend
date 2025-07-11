import { assets } from '../../assets/frontend_assets/assets'
import Product from '../common/Product'

const Products = ({filterProducts}) => {
    return filterProducts.length !== 0 ?
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {
            filterProducts.map((product) => (
              <Product key={product._id} product={product}/>
            ))
        }
    </div>
    :
    <div className={`h-[50vh] sm:w-full flex flex-col justify-center items-center`}>
      <h1 className='text-3xl text-teal-500 animate-bounce'>No Products Found !!</h1>
      <img src={assets.no_products_found} alt="" className='h-1/2'/>
    </div>
}

export default Products