<template>
    <div class="container">
       <div class="row mt-5">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Apartments</h3>

                <div class="card-tools">
                  <button class="btn btn-small btn-success" @click="newModal">
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
                      <th>Apartment Name</th>
                      <th>House Units</th>
                      <th>Location</th>
                      <th>Registered At</th>
                      <th>Modify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="apt in apartments" :key="apt.id">
                      <td>{{apt.id}}</td>
                      <td>{{apt.name}}</td>
                      <td>{{apt.units}}</td>
                      <td>{{apt.location | upText }}</td>
                      <td>{{apt.created_at | myDate}}</td>
                      <td>
                        <a href="#" @click="editModal(apt)">
                            <i class="fas fa-edit blue"></i>
                        </a>/
                        <a href="#" @click="deleteApt(apt.id)">
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
                    <h5 class="modal-title" v-show="!editmode" id="addNewModalLabel">Add Apartment</h5>
                    <h5 class="modal-title" v-show="editmode" id="addNewModalLabel">Edit Apartment Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <form @submit.prevent="editmode ? updateApartment() : createApartment() ">  
                    <div class="modal-body">
                      <div class="modal-body">
                            <div class="form-group">
                                  <label class="col-sm-5 col-form-label">Name of Apartment</label>
                                
                                  <input v-model="form.name" type="text" name="apartment"
                                    placeholder="Enter Apartment name"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                  <div v-if="form.errors.has('name')" v-html="form.errors.get('name')" />
                            </div>
                            <div class="form-group">
                                  <label class="col-sm-5 col-form-label">Number of HSE Units</label>
                                  <input v-model="form.units" type="number" name="units"
                                    placeholder="Enter no. of house units"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('units') }">
                                  <div v-if="form.errors.has('units')" v-html="form.errors.get('units')" />
                            </div>
                             <div class="form-group">
                                  <label class="col-sm-5 col-form-label">Location of Apartment</label>
                                
                                  <input v-model="form.location" type="text" name="location"
                                    placeholder="Enter Location name"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('location') }">
                                  <div v-if="form.errors.has('location')" v-html="form.errors.get('location')" />
                            </div>
                        
                      

                
              </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                      <button v-show="editmode" type="submit" class="btn btn-success">Update</button>
                      <button v-show="!editmode" type="submit" class="btn btn-primary">Create</button>
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
            apartments : {},
            form: new Form({
              id: '',
              name: '',
              units: '',
              location: ''           

            }),
            editmode: false
          }
        },
        methods:{
          newModal(){
              this.editmode = false
              this.form.reset()
              $('#addNewModal').modal('show')
          },
          editModal(apartment){
              this.editmode = true
              this.form.reset()
              $('#addNewModal').modal('show')
              this.form.fill(apartment)

          },
          createApartment(){
              this.$Progress.start()
              this.form.post('/api/apartment')
                .then(()=>{
                  Fire.$emit('ReloadApts')
                  $('#addNewModal').modal('hide')

                   Toast.fire({
                         icon: 'success',
                         title: 'Apartment added successfully'
                       });

                  this.$Progress.finish()    
                })
                .catch(()=>{
                  this.$Progress.fail()    
                      

                })
              
      
          },
          updateApartment(){
              this.$Progress.start()
              this.form.put('api/apartment/'+this.form.id)
                .then(()=>{
                       Fire.$emit('ReloadApts')
                       $('#addNewModal').modal('hide')
    
                       Toast.fire({
                          icon: 'success',
                          title: 'Apt Details edited successfully'
                        });

                  this.$Progress.finish() 
                })
                .catch(()=>{
                  this.$Progress.fail()    
                  
                })
          },
          deleteApt(id){
            Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if(result.value){

                        this.$Progress.start()
                          
                        this.form.delete('api/apartment/'+id)
                              .then((result)=>{
                                
                                  if (result.isConfirmed) {
                                    Swal.fire(
                                      'Deleted!',
                                      'Record has been deleted.',
                                      'success'
                                    )
                                  }
                                  Fire.$emit('ReloadApts')
                                  this.$Progress.finish()
                                      Toast.fire({
                                        icon: 'warning',
                                        title: 'Record deleted successfully'
                                      });
      
                              })
                            .catch(()=>{
                                Swal.fire(
                                'Ooops!',
                                'Something went wrong, Try again.',
                                'error'
                                )
                              })    
                           }
                    })
          },
           loadApts(){ 
              axios.get('api/apartment')
                .then(({data}) => (this.apartments = data.data));
          },
        },
        created() {
            this.loadApts()
            Fire.$on("ReloadApts", ()=>{
              this.loadApts()
            })
            // setInterval(()=>this.loadUsers(),3000)

        }
      }

    
</script>
