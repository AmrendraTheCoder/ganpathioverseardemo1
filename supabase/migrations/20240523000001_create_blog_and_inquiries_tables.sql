-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  response TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable realtime for both tables
alter publication supabase_realtime add table blog_posts;
alter publication supabase_realtime add table contact_inquiries;

-- Create sample blog post
INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, author, category, created_at)
VALUES (
  'The Art of Offset Printing: A Comprehensive Guide',
  'art-of-offset-printing-guide',
  'Discover the intricacies of offset printing and why it remains the gold standard for high-quality print projects.',
  '<p>Offset printing has been the backbone of the commercial printing industry for decades, and for good reason. This tried-and-true printing method delivers exceptional quality, consistency, and cost-effectiveness for medium to large print runs.</p><h2>How Offset Printing Works</h2><p>Unlike digital printing, which transfers toner directly onto paper, offset printing uses plates (typically made from aluminum) that transfer an image onto a rubber blanket, which then transfers it onto the printing surface. This indirect method—where the image is offset from the plate to the blanket to the surface—is why it''s called "offset" printing.</p><h2>Advantages of Offset Printing</h2><ul><li><strong>Superior Image Quality:</strong> Offset printing produces sharp, clean images and type with consistent high quality.</li><li><strong>Cost-Effective for Large Runs:</strong> While setup costs are higher than digital printing, the per-unit cost decreases significantly as quantity increases.</li><li><strong>Wide Range of Materials:</strong> Offset printing works on various paper types, textures, and thicknesses.</li><li><strong>Special Inks and Colors:</strong> Offers precise color matching with Pantone colors and specialty inks like metallics.</li></ul><h2>When to Choose Offset Printing</h2><p>Offset printing is ideal for projects requiring:</p><ul><li>Large quantities (typically 500+ pieces)</li><li>Consistent, high-quality color reproduction</li><li>Specific brand colors (Pantone matching)</li><li>Special finishes or paper stocks</li></ul><p>At Ganpathi Overseas, our state-of-the-art offset printing equipment ensures your projects receive the highest quality treatment. Our experienced press operators meticulously monitor each job to maintain color consistency and image quality throughout the entire run.</p>',
  'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=800&q=80',
  'Rajesh Kumar',
  'Printing Techniques',
  NOW() - INTERVAL '3 days'
);

INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, author, category, created_at)
VALUES (
  'Digital vs. Offset Printing: Which is Right for Your Project?',
  'digital-vs-offset-printing-comparison',
  'Understand the key differences between digital and offset printing to make the best choice for your next print project.',
  '<p>When planning a print project, one of the first decisions you''ll need to make is which printing method to use. The two primary options—digital and offset printing—each have distinct advantages and ideal use cases.</p><h2>Digital Printing</h2><p>Digital printing uses toner or liquid ink directly applied to paper, similar to office printers but with professional-grade equipment.</p><h3>Advantages:</h3><ul><li><strong>Quick Turnaround:</strong> No plate setup means faster production times</li><li><strong>Cost-Effective for Small Runs:</strong> Ideal for quantities under 500</li><li><strong>Variable Data Printing:</strong> Each piece can be personalized</li><li><strong>Print on Demand:</strong> Print only what you need, when you need it</li></ul><h2>Offset Printing</h2><p>Offset printing transfers ink from metal plates to rubber blankets before applying to paper.</p><h3>Advantages:</h3><ul><li><strong>Superior Quality:</strong> Sharper details and more precise color matching</li><li><strong>Cost-Effective for Large Runs:</strong> Unit cost decreases as quantity increases</li><li><strong>Special Inks:</strong> Can use Pantone colors, metallics, and custom inks</li><li><strong>Wide Material Range:</strong> Works on various paper types and thicknesses</li></ul><h2>Making Your Decision</h2><p>Consider these factors when choosing between digital and offset:</p><ul><li><strong>Quantity:</strong> Small runs (under 500) typically favor digital; larger runs favor offset</li><li><strong>Timeline:</strong> Need it fast? Digital usually has quicker turnaround</li><li><strong>Color Accuracy:</strong> Brand-specific colors often require offset with Pantone matching</li><li><strong>Personalization:</strong> Variable data needs point to digital</li><li><strong>Budget:</strong> Consider both immediate costs and per-unit pricing</li></ul><p>At Ganpathi Overseas, we offer both digital and offset printing services, allowing us to recommend the best solution for your specific project requirements and budget.</p>',
  'https://images.unsplash.com/photo-1611244419377-b0a760c19719?w=800&q=80',
  'Priya Sharma',
  'Printing Techniques',
  NOW() - INTERVAL '7 days'
);
