

const useReducer = (initialState={},action)=>{

    switch(action.type){
        case  "ADD_TO_CART": {
            var previsouProductData = [];
            var updatedData = {...action.data,count: 1};
            if(initialState && initialState.productData) {
                previsouProductData = initialState.productData;
                let ind = initialState.productData.findIndex((each)=>each.title === action.data.title);
                if(ind > -1) {
                    //if it is duplicate items
                     initialState.productData[ind].count++;
                     return {...initialState};
                  } else {
                    // if already some data present but now new item is coming
                    updatedData.isAdded = true;
                  }
            }
            
                return {...initialState, productData : [...previsouProductData, updatedData]};
        
        }
        case  "REMOVE_FROM_CART":   
        {
            let fromWhere = action.from;
            let requiredData = [];
            if(fromWhere === 'Cart') {
               requiredData = initialState && initialState.productData ? initialState.productData : [];
            }else if(fromWhere === 'Orders') {
                requiredData = initialState && initialState.ordersData ? initialState.ordersData : [];
            } else if(fromWhere === 'Wishlist') {
                requiredData = initialState && initialState.wishlistData ? initialState.wishlistData : [];
            }
            
        let  ind = requiredData.findIndex((each)=>each.id === action.id);
         if(ind >= 0) {
            if(requiredData[ind].count === 1) {
                requiredData[ind].isAdded = false;
                let updationData;
                if(fromWhere === 'Cart') {
                    return {...initialState, productData : requiredData.filter((each)=>each.id !== action.id)};
                } else if(fromWhere === 'Orders') {
                    return {...initialState, ordersData : requiredData.filter((each)=>each.id !== action.id)}; 
                } else if(fromWhere === 'Wishlist') {
                    return {...initialState, wishlistData : requiredData.filter((each)=>each.id !== action.id)}; 

                }
            }
            else {
                if(fromWhere === 'Cart') {
                    initialState.productData[ind].count--;
                } else if(fromWhere === 'Orders') {
                    initialState.ordersData[ind].count--;
                } else if(fromWhere === 'Wishlist') {
                    initialState.wishlistData[ind].count--;

                }
              return {...initialState};
            }
         }
        }
        case  "ORDER_PLACED":{
            let previousOrders = [];
            if(initialState.ordersData) {
                previousOrders = initialState.ordersData;
            }
            return {...initialState,ordersData: [...previousOrders,action.data]};
        }
        case  "ADD_TO_WISHLIST":{
            let previousWIshlist = [];
            if(initialState.wishlistData) {
                previousWIshlist = initialState.wishlistData;
            }
            return {...initialState,wishlistData: [...previousWIshlist,action.data]};
        }
        case  "NEED_API":{
       return {...initialState,shouldCallApi : action.data.shouldApiCall}
        }
        case  "ALL_PRODUCTS":{
            localStorage.setItem("allProducts",JSON.stringify(action.data));
            return {...initialState,allProducts : action.data}
         }
        case  "ALL_ORDERS":{
            return {...initialState,ordersData : action.data}
        }
        case "LOGIN" : {
            return {...initialState,loginData : action.data}
        }

        default:
            return initialState;    
    }
}
export default useReducer;