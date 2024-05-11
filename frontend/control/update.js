function run() {
    new Vue({
      el: '#update',
      data: {
        id: '',
        message: '',
        httpBackendUrl: 'http://localhost:3000',
        resourcesApi:   'http://localhost:55970',
        movie: {}
      },
      created: function () {
        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");
  
        if (!this.id) {
          console.error('No movie ID provided');
          return;
        }
  console.log(this.id);
        axios.get(`${this.httpBackendUrl}/movies/${this.id}`)
          .then((response) => {
            this.movie = response.data;
          })
          .catch((error) => {
            console.error('Failed to fetch movie details:', error);
          });
      },
      methods: {
        update: function() {
          console.log(this.movie);
          axios.put(`${this.httpBackendUrl}}/movies`, this.movie)
            .then((response) => {
              this.message = response.data;
              console.log('Movie updated successfully');
            })
            .catch((error) => {
              console.error('Failed to update movie:', error);
            });
        }
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  