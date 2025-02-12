import Swal from 'sweetalert2';

function confirmationPopup() {
  return Swal.fire({
    html: `<h4 style="font-size:1.2rem;">Sure, you want to delete the task !?</h4>`,
    confirmButtonColor: '#0063a0',
    showDenyButton: true,
    confirmButtonText: 'Delete',
    denyButtonText: `Cancel`,
  });
}

export default confirmationPopup;
