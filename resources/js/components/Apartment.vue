<template>
    <div class="container">
       <div class="row mt-5">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Apartments</h3>

                <div class="card-tools">
                  <button class="btn btn-small btn-success" data-toggle="modal" data-target="#addNewModal">
                    Add New 
                    <i class="fas fa-plus-square"></i></button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>House Units</th>
                      <th>Location</th>
                      <th>Date Added</th>
                      <th>Modify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>183</td>
                      <td>16</td>
                      <td>Mugutha</td>
                      <td>-</td>
                      <td>
                        <a href="#">
                            <i class="fas fa-edit orange"></i>
                        </a>/
                        <a href="#">
                            <i class="fas fa-trash red"></i>
                        </a>
                        </td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
        <!-- Add Modal -->

        <div class="modal fade" id="addNewModal" tabindex="-1" role="dialog" aria-labelledby="addNewModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="addNewModalLabel">Add Apartment</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <form @submit.prevent="createApartment">  
                    <div class="modal-body">
                      <div class="modal-body">
                            <div class="form-group">
                                  <label class="col-sm-5 col-form-label">Name of Apartment</label>
                                
                                  <input v-model="form.name" type="text" name="apartment"
                                    placeholder="Enter Apartment name"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('apartment') }">
                                  <has-error :form="form" field="apartment"></has-error>
                            </div>
                            <div class="form-group">
                                  <label class="col-sm-5 col-form-label">Number of HSE Units</label>
                                  <input v-model="form.units" type="number" name="units"
                                    placeholder="Enter no. of house units"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('units') }">
                                  <has-error :form="form" field="units"></has-error>
                            </div>
                        
                      

                
              </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                      <button type="submit" class="btn btn-primary">Create</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
    </div>

</template>

<script>
    export default {
        data(){
          return{
            form: new Form({
              name: '',
              units: ''             

            })
          }
        },
        methods:{
          createApartment(){
              this.form.post('/api/apartment');
      
          }
        },
        mounted() {
        console.log('Component mounted.')
        }
    }
</script>
