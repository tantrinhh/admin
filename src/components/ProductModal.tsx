import { useSelector } from "react-redux";
import "../styles/ProductModal.css";
import { Product } from "../redux/slice/product/type";
import { RootState } from "../redux/RootReducer";

type Props = {
  onClose: () => void;
  data: Product;
};

const ProductModal = (props: Props) => {
  const { onClose, data } = props;
  const product = useSelector(
    (state: RootState) => state.product.selectProduct
  );

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div>
          <h3 className="font-bold my-5 text-[20px]">Product Data</h3>
          <div>
            {product && (
              <>
                <div>
                  <img src={product.image} />
                </div>
                <div>
                  <label>Name: {product.name}</label>
                </div>
                <div>
                  <label>Description: {product.description}</label>
                </div>
                <div>
                  <label>Price: Rs. {product.price.toLocaleString()}</label>
                </div>
                <div>
                  <label>Discount: {product.discount}%</label>
                </div>
                <div>
                  <label>Count: {product.count}</label>
                </div>
                <div>
                  <label>
                    Sizes:{" "}
                    {product.sizes.map((size, index) => (
                      <span key={index}>
                        {size}
                        {index < product.sizes.length - 1 && ", "}
                      </span>
                    ))}
                  </label>
                </div>
                <div>
                  <label>
                    Colors:{" "}
                    {product.colors.map((color, index) => (
                      <span key={index}>
                        {color}
                        {index < product.colors.length - 1 && ", "}
                      </span>
                    ))}
                  </label>
                </div>
                <div>
                  <label>Create at: {product.dateAdded}</label>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
