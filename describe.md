# Describe to Image

Convert text descriptions into beautiful PNG images automatically.

## How It Works

1. Write a description in Markdown or plain text
2. The system generates an HTML rendering based on your description
3. Download the result as a PNG image

## Example Descriptions

### Example 1: Social Media Card
```
Create a social media card with:
- Background: gradient from blue (#2196F3) to purple (#9C27B0)
- Title: "Describe to Image"
- Subtitle: "Turn Ideas into Visuals"
- Text color: white
- Padding: 40px
- Border radius: 10px
- Font: Modern sans-serif
```

### Example 2: Quote Card
```
Style: Elegant quote card
Quote: "The best time to plant a tree was 20 years ago. The second best time is now."
Author: Chinese Proverb
Background: Light beige (#FFF8DC)
Text color: Dark brown (#3E2723)
Border: Left accent in gold (#FFD700)
Padding: 30px
```

### Example 3: Product Showcase
```
Create a product card:
- Product name: "Premium Notebook"
- Price: $24.99
- Rating: 4.5/5 stars
- Description: "High-quality notebook perfect for journaling"
- Image placeholder with gradient
- Call-to-action button: "Add to Cart"
- Color scheme: Minimalist black and white
```

## Usage Instructions

1. Navigate to `http://localhost:3000/home`
2. You'll see a list of available templates
3. Select a template or create a new description
4. Preview the generated HTML
5. Click "Download as PNG" to save the image

## Available Templates

The system comes with pre-built templates:
- `social-card.html` - Social media card template
- `quote-card.html` - Quote/testimonial template
- `product-card.html` - Product showcase template

Add more by creating new HTML files in the `templates/` folder.
