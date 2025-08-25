import { assets } from '../../assets/frontend_assets/assets'
import { useShopContext } from '../../contexts/ShopContext'
import Product from '../common/Product'
import Spinner from '../common/Spinner'

const Products = ({ filterProducts }) => {

  const { loading } = useShopContext();

  return loading ?
    <Spinner />
    :
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
      {
        filterProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))
      }
    </div>
}

export default Products