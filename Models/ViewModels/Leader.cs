namespace DojoQA.Models
{
    public class Leader
    {
        public string userId { get; set; }
        public string name { get; set; }
        public int count { get; set; }
        public int? currentStack { get; set; }

        public Leader() {}

        public Leader(ApplicationUser user) {
            userId = user.Id;
            name = user.FirstName + " " + user.LastName;
            if (user.CurrentStack != null) {
                currentStack = (int) user.CurrentStack;
            }
        }
    }
}