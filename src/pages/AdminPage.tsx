import { AdminDashboard } from "../components/admin/AdminDashboard";
import { AdminGuard } from "../components/admin/AdminGuard";
import { useCms } from "../hooks/useCms";

export function AdminPage() {
  const cms = useCms();

  return (
    <AdminGuard>
      <AdminDashboard
        events={cms.state.events}
        merch={cms.state.merch}
        gallery={cms.state.gallery}
        radio={cms.state.radio}
        users={cms.state.users}
        onCreateEvent={cms.createEvent}
        onUpdateEvent={cms.updateEvent}
        onDeleteEvent={cms.deleteEvent}
        onReorderEvents={(from, to) =>
          cms.reorderEvents({ fromIndex: from, toIndex: to })
        }
        onCreateMerch={cms.createMerch}
        onUpdateMerch={cms.updateMerch}
        onDeleteMerch={cms.deleteMerch}
        onReorderMerch={(from, to) =>
          cms.reorderMerch({ fromIndex: from, toIndex: to })
        }
        onCreateGalleryItem={cms.createGalleryItem}
        onUpdateGalleryItem={cms.updateGalleryItem}
        onDeleteGalleryItem={cms.deleteGalleryItem}
        onReorderGallery={(from, to) =>
          cms.reorderGallery({ fromIndex: from, toIndex: to })
        }
        onCreateUser={cms.createUser}
        onUpdateUser={cms.updateUser}
        onDeleteUser={cms.deleteUser}
        onReorderUsers={(from, to) =>
          cms.reorderUsers({ fromIndex: from, toIndex: to })
        }
        onUpdateRadio={cms.updateRadio}
      />
    </AdminGuard>
  );
}