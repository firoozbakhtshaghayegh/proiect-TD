new Vue(
    {
        el: '#movies-component',
        data: {
            movies: [],
            resourcesApi: 'http://localhost:55970',
            httpBackendUrl: 'http://localhost:3000'
        },
        created: function(){
            this.getMovies();
            this.deleteMovie();
        },
        methods: {
            getMovies: function(){
                axios.get(`${this.httpBackendUrl}/movies`).then(response => { 
                    this.movies = response.data;
                });
            },

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
            // sortMovies: function(criteria) {
            //     switch(criteria) {
            //         case 'id':
            //             this.movies.sort((a, b) => a.name.localeCompare(b.name));
            //             break;
            //         case 'price':
            //             this.movies.sort((a, b) => b.id - a.id);
            //             break;
            //         // Poți adăuga și alte criterii de sortare aici
            //         default:
            //             console.error('Invalid sorting criteria');
            //     }
            // }
        },
    }
);