import { useSelector } from "react-redux";
import "../styles/ProductModal.css";
import { Product } from "../redux/slice/product/type";
import { RootState } from "../redux/RootReducer";

type Props = {
  onClose: () => void;
  data: Product;
};

const ProductModal = (props: Props) => {
  const { onClose } = props;
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
          <h3 className="font-bold my-16 text-[20px] text-center ">
            View Product Data
          </h3>
          <div>
            {product && (
              <>
                <div className="flex gap-10 ">
                  {" "}
                  <div>
                    <img src={product.image} alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-10 ">
                    {" "}
                    <div>
                      <label className="font-bold">Name: </label>
                      {product.name}
                    </div>
                    <div>
                      <label className="font-bold">Description: </label>
                      {product.description}
                    </div>
                    <div>
                      <label className="font-bold">Price: </label>Rs.
                      {product.price.toLocaleString()}
                    </div>
                    <div>
                      <label className="font-bold">Discount: </label>
                      {product.discount}%
                    </div>
                    <div>
                      <label className="font-bold">Collection: </label>
                      {product.collection}
                    </div>
                    <div>
                      <label className="font-bold">Sizes: </label>
                      {product.sizes.map((size, index) => (
                        <span key={index}>
                          {size}
                          {index < product.sizes.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                    <div>
                      <label className="font-bold">Colors: </label>
                      {product.colors.map((color, index) => (
                        <span key={index}>
                          {color}
                          {index < product.colors.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                    <div>
                      <label className="font-bold">Create at: </label>
                      {product.dateAdded}
                    </div>
                  </div>
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
