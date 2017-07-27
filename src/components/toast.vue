<template>
	<div v-if="status" id="toast">
		<div class="modal-overlay modal-overlay-visible"></div>
	    <div class="toast">
			<div class="modal  modal-in" style="display: block;">
				<div class="modal-inner">
					<div class="modal-text">{{text}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    name:"toast",
    props:["text","status"],
    data:function () {
       return {
          
       }
    }
}
</script>

<style scoped>
.modal{width:auto;margin-left:0;left:0;top:0;position: static;}
.toast{display: flex;justify-content: center; align-items: center;width: 100%;height: 100%; position: absolute;top: 0;left: 0}
.modal .modal-inner{font-size:13px;padding: 4px 20px;background: #333;color: #fff;text-align:center}
</style>