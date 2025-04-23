
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Check, Plus, Trash, UserPlus, Users, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  email: string;
  name: string;
  role: "viewer" | "editor";
  active: boolean;
};

type UserPermissionsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function UserPermissionsDialog({ open, onOpenChange }: UserPermissionsDialogProps) {
  const [users, setUsers] = useState<User[]>([
    { id: "1", email: "viewer1@example.com", name: "John Viewer", role: "viewer", active: true },
    { id: "2", email: "viewer2@example.com", name: "Jane Editor", role: "editor", active: false },
  ]);
  const [newEmail, setNewEmail] = useState("");
  const { toast } = useToast();

  const handleAddUser = () => {
    if (!newEmail || !newEmail.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Check if user already exists
    if (users.some(user => user.email === newEmail)) {
      toast({
        title: "User Already Exists",
        description: "This user has already been added",
        variant: "destructive",
      });
      return;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: newEmail,
      name: newEmail.split('@')[0],
      role: "viewer",
      active: true,
    };

    setUsers([...users, newUser]);
    setNewEmail("");
    
    toast({
      title: "User Added",
      description: "User has been added as a viewer",
    });
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          active: !user.active,
        };
      }
      return user;
    }));

    const user = users.find(u => u.id === userId);
    if (user) {
      toast({
        title: user.active ? "Access Disabled" : "Access Enabled",
        description: `${user.name}'s access has been ${user.active ? 'disabled' : 'enabled'}`,
      });
    }
  };

  const removeUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    setUsers(users.filter(user => user.id !== userId));
    
    if (user) {
      toast({
        title: "User Removed",
        description: `${user.name} has been removed`,
      });
    }
  };

  const changeUserRole = (userId: string, role: "viewer" | "editor") => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          role,
        };
      }
      return user;
    }));

    const user = users.find(u => u.id === userId);
    if (user) {
      toast({
        title: "Role Updated",
        description: `${user.name} is now a ${role}`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Manage Dashboard Access
          </DialogTitle>
          <DialogDescription>
            Grant access to other users and manage their permissions
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-end gap-2">
            <div className="flex-1 space-y-1">
              <Label htmlFor="email">Add User by Email</Label>
              <Input 
                id="email" 
                placeholder="email@example.com" 
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <Button onClick={handleAddUser}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          <div>
            <Label className="mb-2 block">User Access</Label>
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="h-10 px-4 text-left font-medium">User</th>
                    <th className="h-10 px-2 text-left font-medium">Role</th>
                    <th className="h-10 px-2 text-left font-medium">Status</th>
                    <th className="h-10 px-2 text-center font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-muted-foreground">
                        No users added yet
                      </td>
                    </tr>
                  ) : (
                    users.map(user => (
                      <tr key={user.id} className="border-b">
                        <td className="p-2">
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </td>
                        <td className="p-2">
                          <select
                            className="w-full text-xs p-1 border rounded bg-background"
                            value={user.role}
                            onChange={(e) => changeUserRole(user.id, e.target.value as "viewer" | "editor")}
                          >
                            <option value="viewer">Viewer</option>
                            <option value="editor">Editor</option>
                          </select>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center space-x-2">
                            <Switch 
                              checked={user.active} 
                              onCheckedChange={() => toggleUserStatus(user.id)}
                              id={`user-status-${user.id}`}
                            />
                            <span className={`text-xs ${user.active ? 'text-green-600' : 'text-muted-foreground'}`}>
                              {user.active ? 'Active' : 'Disabled'}
                            </span>
                          </div>
                        </td>
                        <td className="p-2 text-center">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-destructive" 
                            onClick={() => removeUser(user.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button onClick={() => {
            onOpenChange(false);
            toast({
              title: "Changes Saved",
              description: "User access settings have been updated",
            });
          }}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
