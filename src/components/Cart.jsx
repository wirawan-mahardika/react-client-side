import { useSelector } from "react-redux";

export default function Cart() {
  const items = useSelector((state) => state.cart);
  console.log(items);

  let totalPrice = 0;
  items.forEach((item) => {
    const itemPriceTotal = item.price * item.jumlah;
    totalPrice += itemPriceTotal;
  });
  return (
    <>
      <div className="flex flex-col gap-y-3">
        <h2 className="font-bold text-3xl uppercase text-gray-800">
          Cart Items
        </h2>
        {items &&
          items.map((item) => {
            const price = item.price * item.jumlah;
            return (
              <div
                key={item.name}
                className="flex justify-between p-5 bg-white "
              >
                <div className="flex gap-x-4 items-center">
                  <img src={item.src} alt="asd" className="w-44" />
                  <h3 className="font-bold text-xl">
                    <span className="text-sky-500">{item.jumlah} X</span>{" "}
                    {item.name}
                  </h3>
                </div>
                <div className="justify-center items-center flex flex-col">
                  <p className="font-bold text-lg">Price</p>
                  <p>{numberWithCommas(price)}</p>
                </div>
              </div>
            );
          })}

        <div className="bg-white flex justify-between w-full self-end p-4">
          <div>
            {items.length ? (
              <>
                <p className="font-bold text-lg">TOTAL PRIZE</p>
                <p className="font-semibold">{numberWithCommas(totalPrice)}</p>
              </>
            ) : (
              <p className="font-bold text-lg">CART EMPTY</p>
            )}
          </div>

          {items.length ? (
            <button className="px-4 py-0.5 bg-emerald-500 rounded-lg font-medium">
              BUY
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
