@@ .. @@
   const resetForm = () => {
     setFormData({
       name: "",
       description: "",
       content: "",
       image_url: "",
       original_price: "",
       discount_price: "",
       category_id: "",
       stock_quantity: "",
     });
   };

   const handleAddProduct = async () => {
     try {
       if (!formData.name || !formData.content || !formData.original_price || !formData.discount_price) {
         toast({
           title: "Validation Error",
           description: "Please fill in all required fields.",
           variant: "destructive",
         });
         return;
       }

       await api.createProduct({
         name: formData.name,
         description: formData.description || null,
         content: formData.content,
         image_url: formData.image_url || "https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg",
         original_price: parseFloat(formData.original_price),
         discount_price: parseFloat(formData.discount_price),
         category_id: formData.category_id || null,
         stock_quantity: parseInt(formData.stock_quantity) || 0,
         is_active: true,
       });

       toast({
         title: "Success",
         description: "Product added successfully!",
       });

       setIsAddDialogOpen(false);
       resetForm();
       loadData();
       onStatsUpdate();
     } catch (error) {
       console.error('Error adding product:', error);
       toast({
         title: "Error",
         description: "Failed to add product. Please try again.",
         variant: "destructive",
       });
     }
   };

   const handleEditProduct = async () => {
     if (!editingProduct) return;

     try {
+      if (!formData.name || !formData.content || !formData.original_price || !formData.discount_price) {
+        toast({
+          title: "Validation Error",
+          description: "Please fill in all required fields.",
+          variant: "destructive",
+        });
+        return;
+      }
+
       await api.updateProduct(editingProduct.id, {
         name: formData.name,
         description: formData.description || null,
         content: formData.content,
         image_url: formData.image_url,
         original_price: parseFloat(formData.original_price),
         discount_price: parseFloat(formData.discount_price),
         category_id: formData.category_id || null,
         stock_quantity: parseInt(formData.stock_quantity),
       });

       toast({
         title: "Success",
         description: "Product updated successfully!",
       });

       setIsEditDialogOpen(false);
       setEditingProduct(null);
       resetForm();
       loadData();
       onStatsUpdate();
     } catch (error) {
       console.error('Error updating product:', error);
       toast({
         title: "Error",
         description: "Failed to update product. Please try again.",
         variant: "destructive",
       });
     }
   };

   const handleDeleteProduct = async (productId: string) => {
     try {
       await api.deleteProduct(productId);
       toast({
         title: "Success",
         description: "Product deleted successfully!",
       });
       loadData();
       onStatsUpdate();
     } catch (error) {
       console.error('Error deleting product:', error);
       toast({
         title: "Error",
         description: "Failed to delete product. Please try again.",
         variant: "destructive",
       });
     }
   };

   const openEditDialog = (product: Product) => {
     setEditingProduct(product);
     setFormData({
       name: product.name,
       description: product.description || "",
       content: product.content,
       image_url: product.image_url,
       original_price: product.original_price.toString(),
       discount_price: product.discount_price.toString(),
       category_id: product.category_id || "",
       stock_quantity: product.stock_quantity.toString(),
     });
     setIsEditDialogOpen(true);
   };

+  const handleInputChange = (field: keyof typeof formData, value: string) => {
+    setFormData(prev => ({ ...prev, [field]: value }));
+  };
+
   // Filter and sort products
   const filteredProducts = products
     .filter(product =>
       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.content.toLowerCase().includes(searchTerm.toLowerCase())
     )
     .sort((a, b) => {
       switch (sortBy) {
         case "name":
           return a.name.localeCompare(b.name);
         case "price":
           return a.discount_price - b.discount_price;
         case "stock":
           return a.stock_quantity - b.stock_quantity;
         default:
           return 0;
       }
     });

   // Pagination
   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
   const paginatedProducts = filteredProducts.slice(
     (currentPage - 1) * itemsPerPage,
     currentPage * itemsPerPage
   );

   const ProductForm = ({ isEdit = false }) => (
     <div className="space-y-4">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div>
           <Label htmlFor="name">Product Name *</Label>
           <Input
             id="name"
             value={formData.name}
-            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
+            onChange={(e) => handleInputChange("name", e.target.value)}
             placeholder="Enter product name"
           />
         </div>
         <div>
           <Label htmlFor="category">Category</Label>
-          <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
+          <Select value={formData.category_id} onValueChange={(value) => handleInputChange("category_id", value)}>
             <SelectTrigger>
               <SelectValue placeholder="Select category" />
             </SelectTrigger>
             <SelectContent>
               {categories.map((category) => (
                 <SelectItem key={category.id} value={category.id}>
                   {category.name}
                 </SelectItem>
               ))}
             </SelectContent>
           </Select>
         </div>
       </div>

       <div>
         <Label htmlFor="description">Description</Label>
         <Textarea
           id="description"
           value={formData.description}
-          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
+          onChange={(e) => handleInputChange("description", e.target.value)}
           placeholder="Enter product description"
           rows={3}
         />
       </div>

       <div>
         <Label htmlFor="content">Content *</Label>
         <Input
           id="content"
           value={formData.content}
-          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
+          onChange={(e) => handleInputChange("content", e.target.value)}
           placeholder="Enter product content/specifications"
         />
       </div>

       <div>
         <Label htmlFor="image_url">Image URL</Label>
         <Input
           id="image_url"
           value={formData.image_url}
-          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
+          onChange={(e) => handleInputChange("image_url", e.target.value)}
           placeholder="Enter image URL"
         />
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div>
           <Label htmlFor="original_price">Original Price *</Label>
           <Input
             id="original_price"
             type="number"
             step="0.01"
             value={formData.original_price}
-            onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
+            onChange={(e) => handleInputChange("original_price", e.target.value)}
             placeholder="0.00"
           />
         </div>
         <div>
           <Label htmlFor="discount_price">Discount Price *</Label>
           <Input
             id="discount_price"
             type="number"
             step="0.01"
             value={formData.discount_price}
-            onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })}
+            onChange={(e) => handleInputChange("discount_price", e.target.value)}
             placeholder="0.00"
           />
         </div>
         <div>
           <Label htmlFor="stock_quantity">Stock Quantity</Label>
           <Input
             id="stock_quantity"
             type="number"
             value={formData.stock_quantity}
-            onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
+            onChange={(e) => handleInputChange("stock_quantity", e.target.value)}
             placeholder="0"
           />
         </div>
       </div>

       <div className="flex justify-end space-x-2 pt-4">
         <Button
           variant="outline"
           onClick={() => {
             if (isEdit) {
               setIsEditDialogOpen(false);
               setEditingProduct(null);
             } else {
               setIsAddDialogOpen(false);
             }
             resetForm();
           }}
         >
           Cancel
         </Button>
         <Button onClick={isEdit ? handleEditProduct : handleAddProduct}>
           {isEdit ? "Update Product" : "Add Product"}
         </Button>
       </div>
     </div>
   );