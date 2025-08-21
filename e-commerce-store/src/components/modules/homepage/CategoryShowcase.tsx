import React from 'react';
import '../../../styles/homepage.css';

interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
  link: string;
}

const CategoryShowcase: React.FC = () => {
  const categories: Category[] = [
    {
      id: 1,
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      count: 120,
      link: '/category/electronics'
    },
    {
      id: 2,
      name: 'Fashion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      count: 250,
      link: '/category/fashion'
    },
    {
      id: 3,
      name: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      count: 180,
      link: '/category/home-living'
    },
    {
      id: 4,
      name: 'Beauty',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      count: 95,
      link: '/category/beauty'
    },
    {
      id: 5,
      name: 'Sports',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      count: 110,
      link: '/category/sports'
    },
    {
      id: 6,
      name: 'Books',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      count: 75,
      link: '/category/books'
    }
  ];

  return (
    <section className="category-showcase">
      <div className="container">
        <h2 className="section-title">Shop By Category</h2>
        <p className="category-subtitle">Browse our wide selection of products by category</p>
        
        <div className="category-grid">
          {categories.map(category => (
            <a href={category.link} key={category.id} className="category-item">
              <div className="category-image-container">
                <img src={category.image} alt={category.name} className="category-image" />
                <div className="category-overlay"></div>
              </div>
              <div className="category-info">
                <h3 className="category-name">{category.name}</h3>
                <span className="category-count">{category.count} Products</span>
              </div>
            </a>
          ))}
        </div>
        
        <div className="category-cta">
          <a href="/categories" className="btn-view-all">View All Categories</a>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;