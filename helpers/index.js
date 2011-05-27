exports.static = {
  formataData: function(data) {
    return data.getDate() +
      '/' + (data.getMonth() + 1) +
      '/' + data.getFullYear() +
      ' ' + data.getHours() +
      ':' + data.getMinutes() +
      ':' + data.getSeconds();
  },
  valorCampo: function(objeto, attr) {
    return objeto.isNew ? '' : objeto[attr];
  },
  hiddenAlteracao: function(objeto) {
    return objeto.isNew ? '' : '<input type="hidden" name="_method" value="put">';
  },
  url_post: function(post) {
    return post.isNew ? '/admin/posts' : '/admin/posts/' + post.id;
  },
  linkExclusao: function(post) {
    return post.isNew ? '' : '| <a href="/admin/posts/' + post.id  + '/destroy">Excluir</a>';
  }
};
