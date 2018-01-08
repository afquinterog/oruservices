<template>

	<div class="modal fade modal-fall" 
	     :id="id" aria-hidden="true" 
			 :aria-labelledby="id"
          role="dialog" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title">{{title}}</h4>
        </div>
        <div class="modal-body">
					 <slot></slot>
        </div>
      </div>
    </div>
  </div>



</template>

<script>
export default {

  name: 'Modal',
  props: ['id', 'title'],

  data () {
    return {

    };
  }
};
</script>

<style lang="css" scoped>
</style>