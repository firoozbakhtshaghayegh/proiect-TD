function run() {
  new Vue({
    el: '#details',
    data: {
      id: '',
      movie: {},
      resourcesApi: 'http://localhost:55970',
      httpBackendUrl: 'http://localhost:3000'
  
    },
    created: function () {
      let uri = window.location.search.substring(1);
      let params = new URLSearchParams(uri);
      this.id = params.get("id");
    
      axios.get(`${this.httpBackendUrl}/movies/${this.id}`).then(
          (response) => {
              this.movie = response.data;
          }
      );
    },
    methods: {

    deleteMovie: function(id) {
        try {
            axios.delete(`${this.httpBackendUrl}/movies/${id}`).then(response =>{
            this.getMovies()
            })
            console.log('YES');
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    },
    removeEntry:function(index) {
      this.$delete(this.items.movies, index);
  },
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
