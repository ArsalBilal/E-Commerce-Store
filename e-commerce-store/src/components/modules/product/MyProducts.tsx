import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../../services/product';
import Navbar from '../../base/Navbar';
import { Product } from '../../../types';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const MyProducts: React.FC = (): JSX.Element => {
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadMyProducts();
  }, []);

  const loadMyProducts = async () => {
    try {
      setLoading(true);
      const allProducts = await fetchProducts();
      setMyProducts(allProducts);
    } catch (error) {
      console.error('Error loading my products:', error);
      toast.error('Failed to load your products');
    } finally {
      setLoading(false);
    }
  };

  const getStockCount = (stock?: number) => stock || 0;

  const getFilteredProducts = () => {
    switch (filter) {
      case 'active':
        return myProducts.filter(p => getStockCount(p.stock) > 0);
      case 'sold':
        return myProducts.filter(p => getStockCount(p.stock) === 0);
      default:
        return myProducts;
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="my-products-page">
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} />
      
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 mb-0">My Products</h1>
          <Link to="/add-product" className="btn btn-primary">
            <i className="bi bi-plus-circle"></i> Add New Product
          </Link>
        </div>

        <div className="mb-4">
          <div className="btn-group" role="group">
            <button 
              type="button" 
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('all')}
            >
              All ({myProducts.length})
            </button>
            <button 
              type="button" 
              className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('active')}
            >
              Active ({myProducts.filter(p => getStockCount(p.stock) > 0).length})
            </button>
            <button 
              type="button" 
              className={`btn ${filter === 'sold' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('sold')}
            >
              Sold Out ({myProducts.filter(p => getStockCount(p.stock) === 0).length})
            </button>
          </div>
        </div>

        {loading ? (
          <div className="row">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="col-md-4 col-lg-3 mb-4">
                <div className="card">
                  <Skeleton height={200} />
                  <div className="card-body">
                    <Skeleton height={20} className="mb-2" />
                    <Skeleton height={15} width={100} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-inbox display-1 text-muted"></i>
            <h3 className="mt-3">No products found</h3>
            <p className="text-muted">
              {filter === 'all' 
                ? "You haven't added any products yet." 
                : `No products found for "${filter}" filter.`
              }
            </p>
            <Link to="/add-product" className="btn btn-primary">
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="row">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-md-4 col-lg-3 mb-4">
                <div className="card h-100">
                  <img 
                    src={product.thumbnail || '/placeholder.jpg'} 
                    alt={product.title}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text text-muted">
                      {product.description?.substring(0, 100)}...
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h5 mb-0">${product.price}</span>
                      <span className={`badge ${getStockCount(product.stock) > 0 ? 'bg-success' : 'bg-danger'}`}>
                        {getStockCount(product.stock) > 0 ? `${getStockCount(product.stock)} in stock` : 'Sold Out'}
                      </span>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent">
                    <div className="d-flex gap-2">
                      <Link 
                        to={`/product/${product.id}`} 
                        className="btn btn-sm btn-outline-primary flex-fill"
                      >
                        View
                      </Link>
                      <Link 
                        to={`/edit-product/${product.id}`} 
                        className="btn btn-sm btn-outline-secondary flex-fill"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
