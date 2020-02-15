$(document).ready(function(){
    $('.delete-recipe').on('click', function(){
        let id = $(this).data('id');
        let url = '/delete/'+id;
        if(confirm('Delete Recipe?')){
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(result){
                    console.log('Deleting Success');
                    window.location.href='/';
                },
                error: function(err){
                    console.log(err);
                }
            })
        }
    });

    $('.recipes-edit').on('click', function(){
        $('#edit-id').val($(this).data('id'));
        $('#edit-name').val($(this).data('name'));
        $('#edit-ingredients').val($(this).data('ingredients'));
        $('#edit-directions').val($(this).data('directions'));
        
        $('#editModal').modal('show');

    })
});