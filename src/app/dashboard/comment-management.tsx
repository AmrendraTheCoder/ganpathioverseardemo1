// "use client";

// import { useState, useEffect } from "react";
// import { createClient } from "../../supabase/client";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   MessageCircle,
//   CheckCircle,
//   XCircle,
//   Clock,
//   User,
//   Calendar,
//   AlertCircle,
//   Activity,
//   RefreshCw,
//   BarChart3,
// } from "lucide-react";
// import { toast } from "sonner";

// interface Comment {
//   id: string;
//   blog_post_id: string;
//   slug: string;
//   author_name: string;
//   author_email: string;
//   comment_text: string;
//   status: 'pending' | 'approved' | 'rejected';
//   created_at: string;
//   blog_posts?: {
//     title: string;
//   };
// }

// export default function CommentManagement() {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
//   const [isLoading, setIsLoading] = useState(true);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const supabase = createClient();

//   // Fetch comments
//   const fetchComments = async () => {
//     try {
//       setIsRefreshing(true);
//       const { data, error } = await supabase
//         .from('blog_comments')
//         .select(`
//           *,
//           blog_posts (title)
//         `)
//         .order('created_at', { ascending: false });

//       if (error) throw error;
//       setComments(data || []);
//     } catch (error) {
//       console.error('Error fetching comments:', error);
//       toast.error('Failed to fetch comments');
//     } finally {
//       setIsLoading(false);
//       setIsRefreshing(false);
//     }
//   };

//   // Set up real-time subscription
//   useEffect(() => {
//     const channel = supabase
//       .channel('comments_realtime')
//       .on(
//         'postgres_changes',
//         {
//           event: '*',
//           schema: 'public',
//           table: 'blog_comments',
//         },
//         (payload) => {
//           console.log('Comment event:', payload);
          
//           if (payload.eventType === 'INSERT') {
//             // Add new comment with animation
//             fetchComments(); // Refetch to get blog post title
//             toast.success('New comment received!');
//           } else if (payload.eventType === 'UPDATE') {
//             // Update existing comment
//             setComments(prev => 
//               prev.map(comment => 
//                 comment.id === payload.new.id 
//                   ? { ...comment, ...payload.new }
//                   : comment
//               )
//             );
//           } else if (payload.eventType === 'DELETE') {
//             // Remove deleted comment
//             setComments(prev => 
//               prev.filter(comment => comment.id !== payload.old.id)
//             );
//           }
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [supabase]);

//   // Initial fetch
//   useEffect(() => {
//     fetchComments();
//   }, []);

//   // Filter comments
//   const filteredComments = comments.filter(comment => {
//     if (activeTab === 'all') return true;
//     return comment.status === activeTab;
//   });

//   // Update comment status
//   const updateCommentStatus = async (commentId: string, status: 'approved' | 'rejected') => {
//     try {
//       const { error } = await supabase
//         .from('blog_comments')
//         .update({ 
//           status,
//           updated_at: new Date().toISOString()
//         })
//         .eq('id', commentId);

//       if (error) throw error;

//       toast.success(`Comment ${status} successfully!`);
//       setIsDialogOpen(false);
//     } catch (error) {
//       console.error('Error updating comment:', error);
//       toast.error('Failed to update comment status');
//     }
//   };

//   // Delete comment
//   const deleteComment = async (commentId: string) => {
//     try {
//       const { error } = await supabase
//         .from('blog_comments')
//         .delete()
//         .eq('id', commentId);

//       if (error) throw error;

//       toast.success('Comment deleted successfully!');
//       setIsDialogOpen(false);
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//       toast.error('Failed to delete comment');
//     }
//   };

//   // Format date
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Get status badge
//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'pending':
//         return (
//           <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
//             <Clock className="w-3 h-3 mr-1" />
//             Pending
//           </Badge>
//         );
//       case 'approved':
//         return (
//           <Badge className="bg-green-100 text-green-800 border-green-200">
//             <CheckCircle className="w-3 h-3 mr-1" />
//             Approved
//           </Badge>
//         );
//       case 'rejected':
//         return (
//           <Badge className="bg-red-100 text-red-800 border-red-200">
//             <XCircle className="w-3 h-3 mr-1" />
//             Rejected
//           </Badge>
//         );
//       default:
//         return <Badge variant="outline">Unknown</Badge>;
//     }
//   };

//   // Get comment counts
//   const getCommentCounts = () => {
//     return {
//       all: comments.length,
//       pending: comments.filter(c => c.status === 'pending').length,
//       approved: comments.filter(c => c.status === 'approved').length,
//       rejected: comments.filter(c => c.status === 'rejected').length,
//     };
//   };

//   const counts = getCommentCounts();

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           <h2 className="text-2xl font-semibold">Comment Management</h2>
//           <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
//             <Activity className="w-3 h-3 mr-1 animate-pulse" />
//             Live Updates
//           </Badge>
//           <Button
//             onClick={fetchComments}
//             variant="outline"
//             size="sm"
//             disabled={isRefreshing}
//           >
//             <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
//             Refresh
//           </Button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card className="bg-blue-50 border-blue-200">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-red-600">Rejected</p>
//                 <p className="text-2xl font-bold text-red-900 transition-all duration-500">
//                   {counts.rejected}
//                 </p>
//               </div>
//               <XCircle className="w-8 h-8 text-red-500" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Tabs */}
//       <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
//         <TabsList className="mb-6">
//           <TabsTrigger value="pending">
//             Pending ({counts.pending})
//             {counts.pending > 0 && (
//               <div className="w-2 h-2 bg-yellow-500 rounded-full ml-2 animate-pulse" />
//             )}
//           </TabsTrigger>
//           <TabsTrigger value="approved">Approved ({counts.approved})</TabsTrigger>
//           <TabsTrigger value="rejected">Rejected ({counts.rejected})</TabsTrigger>
//           <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
//         </Tabs>

//         <TabsContent value={activeTab}>
//           {isLoading ? (
//             <div className="text-center py-16">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading comments...</p>
//             </div>
//           ) : filteredComments.length === 0 ? (
//             <div className="text-center py-16 bg-gray-50 rounded-xl">
//               <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 No {activeTab === 'all' ? '' : activeTab} comments found
//               </h3>
//               <p className="text-gray-500">
//                 {activeTab === 'pending' 
//                   ? 'New comments will appear here for moderation.'
//                   : `No ${activeTab} comments at the moment.`
//                 }
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {filteredComments.map((comment) => (
//                 <Card 
//                   key={comment.id} 
//                   className={`hover:shadow-lg transition-all duration-300 ${
//                     comment.status === 'pending' ? 'border-yellow-200 bg-yellow-50/30' :
//                     comment.status === 'approved' ? 'border-green-200 bg-green-50/30' :
//                     'border-red-200 bg-red-50/30'
//                   }`}
//                 >
//                   <CardHeader>
//                     <div className="flex items-start justify-between">
//                       <div className="space-y-2">
//                         <div className="flex items-center space-x-2">
//                           <CardTitle className="text-lg">
//                             {comment.blog_posts?.title || 'Unknown Post'}
//                           </CardTitle>
//                           {getStatusBadge(comment.status)}
//                         </div>
//                         <div className="flex items-center space-x-4 text-sm text-gray-500">
//                           <div className="flex items-center">
//                             <User className="h-4 w-4 mr-1" />
//                             <span className="font-medium">{comment.author_name}</span>
//                           </div>
//                           <div className="flex items-center">
//                             <Calendar className="h-4 w-4 mr-1" />
//                             <span>{formatDate(comment.created_at)}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </CardHeader>

//                   <CardContent>
//                     <div className="space-y-4">
//                       {/* Comment Text */}
//                       <div className="p-4 bg-white rounded-lg border">
//                         <p className="text-gray-700 whitespace-pre-wrap">
//                           {comment.comment_text}
//                         </p>
//                       </div>

//                       {/* Author Info */}
//                       <div className="text-sm text-gray-600">
//                         <span className="font-medium">Email:</span> {comment.author_email}
//                       </div>
//                     </div>
//                   </CardContent>

//                   <CardContent className="pt-0">
//                     <div className="flex justify-end space-x-2">
//                       {comment.status === 'pending' && (
//                         <>
//                           <Button
//                             onClick={() => updateCommentStatus(comment.id, 'approved')}
//                             size="sm"
//                             className="bg-green-600 hover:bg-green-700 text-white"
//                           >
//                             <CheckCircle className="w-4 h-4 mr-1" />
//                             Approve
//                           </Button>
//                           <Button
//                             onClick={() => updateCommentStatus(comment.id, 'rejected')}
//                             size="sm"
//                             variant="outline"
//                             className="text-red-600 border-red-300 hover:bg-red-50"
//                           >
//                             <XCircle className="w-4 h-4 mr-1" />
//                             Reject
//                           </Button>
//                         </>
//                       )}
                      
//                       {comment.status === 'approved' && (
//                         <Button
//                           onClick={() => updateCommentStatus(comment.id, 'rejected')}
//                           size="sm"
//                           variant="outline"
//                           className="text-red-600 border-red-300 hover:bg-red-50"
//                         >
//                           <XCircle className="w-4 h-4 mr-1" />
//                           Reject
//                         </Button>
//                       )}
                      
//                       {comment.status === 'rejected' && (
//                         <Button
//                           onClick={() => updateCommentStatus(comment.id, 'approved')}
//                           size="sm"
//                           className="bg-green-600 hover:bg-green-700 text-white"
//                         >
//                           <CheckCircle className="w-4 h-4 mr-1" />
//                           Approve
//                         </Button>
//                       )}

//                       <Button
//                         onClick={() => {
//                           setSelectedComment(comment);
//                           setIsDialogOpen(true);
//                         }}
//                         size="sm"
//                         variant="outline"
//                         className="text-red-600 border-red-300 hover:bg-red-50"
//                       >
//                         Delete
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </TabsContent>
//       </Tabs>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle className="flex items-center">
//               <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
//               Delete Comment
//             </DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this comment from{' '}
//               <span className="font-medium">{selectedComment?.author_name}</span>?
//               This action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
          
//           {selectedComment && (
//             <div className="p-3 bg-gray-50 rounded-lg border">
//               <p className="text-sm text-gray-700 line-clamp-3">
//                 {selectedComment.comment_text}
//               </p>
//             </div>
//           )}

//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setIsDialogOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={() => selectedComment && deleteComment(selectedComment.id)}
//               className="bg-red-600 hover:bg-red-700"
//             >
//               Delete Comment
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Bulk Actions Section */}
//       {counts.pending > 0 && (
//         <Card className="mt-6 bg-yellow-50 border-yellow-200">
//           <CardHeader>
//             <CardTitle className="text-yellow-800 flex items-center">
//               <AlertCircle className="w-5 h-5 mr-2" />
//               Bulk Actions
//             </CardTitle>
//             <CardDescription className="text-yellow-700">
//               You have {counts.pending} comments waiting for review.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex space-x-3">
//               <Button
//                 onClick={async () => {
//                   try {
//                     const pendingComments = comments.filter(c => c.status === 'pending');
//                     const { error } = await supabase
//                       .from('blog_comments')
//                       .update({ status: 'approved', updated_at: new Date().toISOString() })
//                       .in('id', pendingComments.map(c => c.id));

//                     if (error) throw error;
//                     toast.success(`Approved ${pendingComments.length} comments!`);
//                   } catch (error) {
//                     console.error('Error bulk approving:', error);
//                     toast.error('Failed to bulk approve comments');
//                   }
//                 }}
//                 className="bg-green-600 hover:bg-green-700"
//               >
//                 <CheckCircle className="w-4 h-4 mr-2" />
//                 Approve All Pending
//               </Button>
              
//               <Button
//                 onClick={async () => {
//                   try {
//                     const pendingComments = comments.filter(c => c.status === 'pending');
//                     const { error } = await supabase
//                       .from('blog_comments')
//                       .update({ status: 'rejected', updated_at: new Date().toISOString() })
//                       .in('id', pendingComments.map(c => c.id));

//                     if (error) throw error;
//                     toast.success(`Rejected ${pendingComments.length} comments!`);
//                   } catch (error) {
//                     console.error('Error bulk rejecting:', error);
//                     toast.error('Failed to bulk reject comments');
//                   }
//                 }}
//                 variant="outline"
//                 className="text-red-600 border-red-300 hover:bg-red-50"
//               >
//                 <XCircle className="w-4 h-4 mr-2" />
//                 Reject All Pending
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Auto-moderation Settings */}
//       <Card className="mt-6">
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
//             Comment Settings
//           </CardTitle>
//           <CardDescription>
//             Configure how comments are handled on your blog
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div>
//               <h4 className="font-medium">Auto-approve trusted commenters</h4>
//               <p className="text-sm text-gray-600">
//                 Automatically approve comments from users who have had previous comments approved
//               </p>
//             </div>
//             <Button variant="outline" size="sm">
//               Configure
//             </Button>
//           </div>
          
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div>
//               <h4 className="font-medium">Email notifications</h4>
//               <p className="text-sm text-gray-600">
//                 Get notified when new comments are submitted for review
//               </p>
//             </div>
//             <Button variant="outline" size="sm">
//               Settings
//             </Button>
//           </div>
          
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <div>
//               <h4 className="font-medium">Comment moderation</h4>
//               <p className="text-sm text-gray-600">
//                 Require approval for all comments before they appear publicly
//               </p>
//             </div>
//             <Badge className="bg-green-100 text-green-800">
//               Enabled
//             </Badge>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Recent Comment Activity */}
//       {comments.length > 0 && (
//         <Card className="mt-6">
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <Activity className="w-5 h-5 mr-2 text-purple-600 animate-pulse" />
//               Recent Comment Activity
//             </CardTitle>
//             <CardDescription>
//               Latest comment interactions across all blog posts
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3 max-h-80 overflow-y-auto">
//               {comments.slice(0, 10).map((comment, index) => (
//                 <div
//                   key={comment.id}
//                   className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200"
//                   style={{ animationDelay: `${index * 50}ms` }}
//                 >
//                   <div className={`p-1.5 rounded-full ${
//                     comment.status === 'pending' ? 'bg-yellow-100' :
//                     comment.status === 'approved' ? 'bg-green-100' :
//                     'bg-red-100'
//                   }`}>
//                     {comment.status === 'pending' && <Clock className="w-3 h-3 text-yellow-600" />}
//                     {comment.status === 'approved' && <CheckCircle className="w-3 h-3 text-green-600" />}
//                     {comment.status === 'rejected' && <XCircle className="w-3 h-3 text-red-600" />}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-900 truncate">
//                       {comment.author_name} commented on "{comment.blog_posts?.title || 'Unknown Post'}"
//                     </p>
//                     <p className="text-xs text-gray-600 truncate">
//                       "{comment.comment_text.slice(0, 60)}..." • {formatDate(comment.created_at)}
//                     </p>
//                   </div>
//                   <div className={`px-2 py-1 rounded-full text-xs ${
//                     comment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                     comment.status === 'approved' ? 'bg-green-100 text-green-800' :
//                     'bg-red-100 text-red-800'
//                   }`}>
//                     {comment.status}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Export Options */}
//       <Card className="mt-6">
//         <CardHeader>
//           <CardTitle>Export & Analytics</CardTitle>
//           <CardDescription>
//             Download comment data and view engagement analytics
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <Button
//               variant="outline"
//               className="flex flex-col items-center p-6 h-auto"
//               onClick={() => {
//                 // Export functionality
//                 const csvData = comments.map(comment => ({
//                   'Post Title': comment.blog_posts?.title || 'Unknown',
//                   'Author Name': comment.author_name,
//                   'Author Email': comment.author_email,
//                   'Comment': comment.comment_text,
//                   'Status': comment.status,
//                   'Date': formatDate(comment.created_at)
//                 }));
                
//                 const csv = [
//                   Object.keys(csvData[0] || {}).join(','),
//                   ...csvData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
//                 ].join('\n');
                
//                 const blob = new Blob([csv], { type: 'text/csv' });
//                 const url = window.URL.createObjectURL(blob);
//                 const a = document.createElement('a');
//                 a.href = url;
//                 a.download = `blog-comments-${new Date().toISOString().split('T')[0]}.csv`;
//                 a.click();
//                 window.URL.revokeObjectURL(url);
                
//                 toast.success('Comments exported to CSV!');
//               }}
//             >
//               <MessageCircle className="w-6 h-6 mb-2" />
//               <span className="font-medium">Export Comments</span>
//               <span className="text-xs text-gray-500">Download as CSV</span>
//             </Button>
            
//             <Button
//               variant="outline"
//               className="flex flex-col items-center p-6 h-auto"
//               onClick={() => {
//                 toast.info('Analytics feature coming soon!');
//               }}
//             >
//               <BarChart3 className="w-6 h-6 mb-2" />
//               <span className="font-medium">Comment Analytics</span>
//               <span className="text-xs text-gray-500">View trends</span>
//             </Button>
            
//             <Button
//               variant="outline"
//               className="flex flex-col items-center p-6 h-auto"
//               onClick={() => {
//                 toast.info('User insights coming soon!');
//               }}
//             >
//               <User className="w-6 h-6 mb-2" />
//               <span className="font-medium">Top Commenters</span>
//               <span className="text-xs text-gray-500">User insights</span>
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }="text-sm text-blue-600">Total Comments</p>
//                 <p className="text-2xl font-bold text-blue-900 transition-all duration-500">
//                   {counts.all}
//                 </p>
//               </div>
//               <MessageCircle className="w-8 h-8 text-blue-500" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-yellow-50 border-yellow-200">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-yellow-600">Pending Review</p>
//                 <p className="text-2xl font-bold text-yellow-900 transition-all duration-500">
//                   {counts.pending}
//                 </p>
//               </div>
//               <Clock className="w-8 h-8 text-yellow-500" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-green-50 border-green-200">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-green-600">Approved</p>
//                 <p className="text-2xl font-bold text-green-900 transition-all duration-500">
//                   {counts.approved}
//                 </p>
//               </div>
//               <CheckCircle className="w-8 h-8 text-green-500" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-red-50 border-red-200">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className