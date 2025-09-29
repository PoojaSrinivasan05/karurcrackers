@@ .. @@
   const handleStatusUpdate = async (orderId: string, newStatus: string) => {
     try {
       await api.updateOrderStatus(orderId, newStatus as any);
       toast({
         title: "Success",
         description: "Order status updated successfully!",
       });
       loadOrders();
       onStatsUpdate();
     } catch (error) {
       console.error('Error updating order status:', error);
       toast({
         title: "Error",
         description: "Failed to update order status. Please try again.",
         variant: "destructive",
       });
     }
   };