@@ .. @@
   async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
     const { data, error } = await supabase
       .from('products')
       .update(updates)
       .eq('id', id)
       .select()
       .single();

     if (error) throw error;
     return data;
   },

   async deleteProduct(id: string): Promise<void> {
     const { error } = await supabase
       .from('products')
       .delete()
       .eq('id', id);

     if (error) throw error;
   },